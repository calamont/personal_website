#!/bin/sh

# Remove all current html files (incase you removed one of the markdown files)
rm */*.html

# Convert files in subdirectories
for FILE in */*.md
do
    NEWFILE=$(echo $FILE | sed -e 's/.md$/.html/')
    pandoc -t html -o $NEWFILE $FILE
done
