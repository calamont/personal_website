#!/bin/sh

# Convert files in specific subdirectories passed as argument to script
subdirs=$@
for dir in $subdirs
do
    echo $dir
    for file in public/$dir/*.ipynb
    do
        echo $file
        jupyter nbconvert --to html $file
    done
done
