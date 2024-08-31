# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware
This is a challenging task which is why I left it to finish the telemetry section. However after consulting ChatGPT of what libraries I should be importing to do this and creating the relevant structs and a hex to binary conversion function I wasn't able to take the next step and finish the code. I feel like if I had given myself more time I would've finished it.

## Telemetry
For the first task I started with inputting the docker command into my terminal to see the output, I was immediately met with a syyntax error from the JSON parsing function. After some further debugging with print statements I foudn out that some of the data points have an extra curly bracket at the end. At first I thought using a try catch statement would solve the problem but then I realised that the data within these faulty logs are still important so I created an if statement that checks if a log has an exytra curly bracket and cuts it out before parsing it.

For the next part I looked online for how to make a 5-second timer, and using this link https://www.freecodecamp.org/news/how-to-create-a-countdown-timer/ I made one as well as a counter variable to keep track of the logs. However I realised that this only checks if 3 or more logs of interest occur within the timer's countdown and not if the logs themselves are within 5 seconds of each other. After some thinking I realised the vehicle data interface stores the timestamp and using this, I created an array that stores the logs and deletes them if they are 5 seconds old. Based on the length of this array i.e if it's 3 or more, I send out the alert that the battery is going to blow up along with the timestamp. I also noticed that this alert is sent to console before the entry it relates to is printed out which confused me for sometime as I initially thought it wasn't working.

For the last part I looked through the files trying to understand how react works along with watching YouTube videos about it. I then realised that changing the colour of the temps was quite trivial as I just needed to add a few if statements in the live-value.tsx file. As for aesthetic changes I thought adding the battery alert to the website or a graph plotting the temps overtime would be cool to implement but I ran out of time so I settled with changing the colour of the header. I tried adding a background gradient from red to black for the redback colours but that didn't work.
## Cloud
I didn't touch this section