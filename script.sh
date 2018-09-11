#!/bin/bash

echo 'Starting the node app...'

if [ ! -f app.js ]; then
    echo 'File not found!'
    exit -1
fi

if ! type node > /dev/null; then
    echo 'Node not installed!'
    exit -1
fi

eval "export $(/bin/grep -E -z DBUS_SESSION_BUS_ADDRESS /proc/$(/usr/bin/pgrep -u $LOGNAME gnome-session)/environ)"
node app.js