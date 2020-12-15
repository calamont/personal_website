#!/bin/sh

# Convert files in subdirectories
for FILE in public/*/*.md
do
    NEWFILE=$(echo $FILE | sed -e 's/.md$/.html/')
    pandoc -t html -o $NEWFILE $FILE
done
