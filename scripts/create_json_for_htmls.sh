#!/bin/sh

for d in $(find public -type d -mindepth 1 -maxdepth 1)
do
    # # If there is no README.html file then continue to the next directory
    readme_present=$(find $d -iname "readme.html" | wc -l)
    if [ $readme_present -eq 0 ]
    then
        continue
    fi

    # Collect <h1> tags in HTML files and output JSON. Jupyter noteebooks contain an addition
    # anchor tag _within_ the h1 tag that we need to look out for.
    # Pipe the result to the stream editor (sed) to remove the prepended 'public' directory.
    # Then pipe this to jq, which makes a JSON field "files" with an array of JSONs with
    # a field for the html h1 text and the location of the file.
    files_and_titles=$(
    for file in $(find $d -iname "*.html")
    do

        if [[ $file != *"README.html"* ]]
        then
            title=$(ggrep -Pho -e \(\?\<\=\>\)\[a-zA-Z0-9\!\?\:\ \-\]\*\?\(\?\=\(\<a.\*/a\>\)\?\</h1\>\) $file)
            date=$(ggrep -Pho -e \(\(\?\<\=\<time\ datetime\=\"\)\\d{4}\-\\d{2}\-\\d{2}\) $file)
            echo $title%$file%$date
        fi
    done | sed 's_public/__' | jq -R -n '{files: [inputs | split("%") | {title:.[0], file:.[1], type: "text", date:.[2]}] | sort_by(.date) | reverse}')

    readme_filepath=$(find $d -iname "readme.html" | head -n 1 | sed 's_public/__')
    d=$(sed 's_public/__' <<< $d) # strip 'public' folder from directory
    # Add topic (directory) field for where the HTML files belong and README for directory
    jq -n --arg topic "${d%/}" --argjson files "$files_and_titles" --arg readme "$readme_filepath" \
        '$files + ( .topic = $topic ) + ( .readme = {"title": "README", "file": $readme, "type": "text"} )'

done | jq -n '.topics |= [inputs]' > "public/text_files.json"  # combine results from for loop into single JSON
