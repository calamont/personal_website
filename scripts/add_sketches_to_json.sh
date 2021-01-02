#!/bin/sh

# Reimport all p5 sketches into a single javascript file that can be accessed within the
# react app.
rm src/sketches/sketches.js

# Delete libraries used directly by any sketches. These should be found in public/libraries.
rm -r src/sketches/libraries src/sketches/template

# Iterate through each top-level directory in the sketches folder and find the main sketch, which
# should always be named sketch.js. Use this filepath to create a title for each sketch.
files_and_titles=$(
for d in $(find src/sketches -type d -mindepth 1 -maxdepth 1)
do
    title=$(basename $d)
    file=$(find $d -name sketch.js | head -n 1 | sed 's_src/sketches_._')
    echo export { default as $title } from \'$file\' >> src/sketches/sketches.js
    # echo out sketch details so they are captured by jq and procssed into a JSON format
    echo $title%$file
done | jq -R -n '{files: [inputs | split("%") | {title:.[0], file:.[1], type: "sketch"}]}'
)

# Create JSON entry that contains title, files, and readme fields like for the blog posts
sketches_json=$(jq -n --argjson files "$files_and_titles" \
    '$files + ( .topic = "sketches" ) + ( .readme = {"title": "README", "file": "sketches/readme.html", "type": "text"})')

# Append the above JSON entry to the topics field in the files.json file
jq --argjson sketches "$sketches_json" '.topics += [$sketches]' public/text_files.json > public/files.json
