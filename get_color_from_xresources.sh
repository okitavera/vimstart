#!/bin/sh
colorfg=$(xrdb -query | egrep -m1 "^\*\.?foreground:" | awk '{print $NF}')
colorbg=$(xrdb -query | egrep -m1 "^\*\.?background:" | awk '{print $NF}') 
sed -i -e "s;background\"\(.*\)\"\(.*\)\";background\"\1\"$colorbg\";g" $(dirname $0)/web.json
sed -i -e "s;foreground\"\(.*\)\"\(.*\)\";foreground\"\1\"$colorfg\";g" $(dirname $0)/web.json
convert -size 32x32 -background "$colorbg" -fill "$colorbg" -pointsize 10 -fill "$colorfg" -font "DejaVu-Sans-Bold" -gravity Center caption:"VS" -flatten $(dirname $0)/favicon.ico
