#!/bin/sh
colorfg=$(xrdb -query | egrep -m1 "^\*\.?foreground:" | awk '{print $NF}')
colorbg=$(xrdb -query | egrep -m1 "^\*\.?background:" | awk '{print $NF}') 
sed -i -e "s;background\"\(.*\)\"\(.*\)\";background\"\1\"$colorbg\";g" $(dirname $0)/web.json
sed -i -e "s;foreground\"\(.*\)\"\(.*\)\";foreground\"\1\"$colorfg\";g" $(dirname $0)/web.json