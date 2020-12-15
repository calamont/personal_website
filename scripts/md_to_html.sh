#!/bin/sh

# Convert files in subdirectories
for FILE in $(find public -type f -name "*.md")
do
    echo $FILE
    NEWFILE=$(echo $FILE | sed -e 's/.md$/.html/')
    pandoc -t html -o $NEWFILE $FILE
done
