#!/bin/sh
# for d in $(find public -type d)
for d in public/*/
do
    # # If there is no README.html file then continue to the next directory
    readme_present=$(find $d -iname "readme.html" | wc -l)
    if [ $readme_present -eq 0 ]
    then
        continue
    fi

    # TODO: Save the readme as a separate field in the JSON, which will be looked for by the
    # react accordion script first. Then include a data field in each of the markdown/notebook docs
    # that you want to include on your website. This date field can be found as another attribute
    # of the file JSON and can then be used to rank the rest of the docs in the accordion.

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
            ggrep -HPo -e \(\?\<\=\>\)\[a-zA-Z0-9\!\?\:\ \-\]\*\?\(\?\=\(\<a.\*/a\>\)\?\</h1\>\) $file
        fi
    done | sed 's_public/__' | jq -R -n "{(\"files\"):[inputs|split(\":\")|{(\"title\"):.[1],(\"file\"):.[0]}]}")

    readme_filepath=$(find $d -iname "readme.html" | head -n 1)
    d=$(sed 's_public/__' <<< $d) # strip 'public' folder from directory
    # Add topic (directory) field for where the HTML files belong and README for directory
    jq -n --arg topic "${d%/}" --argjson files "$files_and_titles" --arg readme "$readme_filepath" \
        '$files + ( .topic = $topic ) + ( .readme = $readme )'

done | jq -n '.topics |= [inputs]' > "public/files.json"  # combine results from for loop into single JSON


