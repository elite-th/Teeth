#!/bin/bash
while true; do
    cd /home/z/my-project
    node .next/standalone/server.js
    echo "Server crashed, restarting in 3 seconds..." >> /home/z/my-project/dev.log
    sleep 3
done
