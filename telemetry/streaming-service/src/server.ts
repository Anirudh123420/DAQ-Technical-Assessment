import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");
  const outOfRangeEvents: number[] = [];

  socket.on("data", (msg) => {
    var message = msg.toString();
    console.log(`Received: ${message}`);
    if (message.endsWith("}}")) {
      message = message.slice(0, -1);
    }

    const jsonData: VehicleData = JSON.parse(message);

    if (jsonData.battery_temperature < 20 || jsonData.battery_temperature > 80) {
      // Add current timestamp to the event list
      const currentTime = jsonData.timestamp;
      outOfRangeEvents.push(currentTime);

      // Remove any events older than 5 seconds
      const fiveSecondsAgo = currentTime - 5000;
      while (outOfRangeEvents.length > 0 && outOfRangeEvents[0] < fiveSecondsAgo) {
        outOfRangeEvents.shift();
      }

      // Check if there are 3 or more events within the last 5 seconds
      if (outOfRangeEvents.length >= 3) {
        console.error(`ALERT: Battery is going to blow up! Timestamp: ${jsonData.timestamp}`);
      }
    }

    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
