#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <bitset>
#include <algorithm>

// Structure to hold signal information
struct Signal {
    std::string name;
    int startBit;
    int length;
    bool isLittleEndian;
    float factor;
    std::string unit;
};

// Structure to hold CAN frame information
struct CANFrame {
    int id;          // CAN ID
    std::string data; // Raw data payload as hex string
    double timestamp; // Unix timestamp
};

// Structure to hold the parsed DBC information
struct DBCFrame {
    int id;          // CAN ID
    std::vector<Signal> signals; // List of signals
};

// Convert hex string to binary string
std::string hexToBinary(const std::string& hex) {
  std::string binary;
  for (char c : hex) {
    switch (toupper(c)) {
      case '0': binary += "0000"; break;
      case '1': binary += "0001"; break;
      case '2': binary += "0010"; break;
      case '3': binary += "0011"; break;
      case '4': binary += "0100"; break;
      case '5': binary += "0101"; break;
      case '6': binary += "0110"; break;
      case '7': binary += "0111"; break;
      case '8': binary += "1000"; break;
      case '9': binary += "1001"; break;
      case 'A': binary += "1010"; break;
      case 'B': binary += "1011"; break;
      case 'C': binary += "1100"; break;
      case 'D': binary += "1101"; break;
      case 'E': binary += "1110"; break;
      case 'F': binary += "1111"; break;
      default: 
        std::cerr << "Invalid hex character: " << c << std::endl; 
        return "";
    }
  }
  return binary;
}

