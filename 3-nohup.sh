#!/bin/bash

nohup node 2-server.js &

# This will run the server in a background process that ignores the SIGHUP signal
# Stop the process with killall node or
# kill $(ps aux | grep 'node' | awk '{print $2}')
# sudo netstat -tulpn | grep /node