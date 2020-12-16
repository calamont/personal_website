# for d in $(find public -type d)
for d in public/*/
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
    file_json=$(ggrep -HPro -e \(\?\<\=\>\)\[a-zA-Z0-9\!\?\:\ \-\]\*\?\(\?\=\(\<a.\*/a\>\)\?\</h1\>\) --include "*.html" $d \
        | sed 's_public/__' \
        | jq -R -n "{(\"files\"):[inputs|split(\":\")|{(\"title\"):.[1],(\"file\"):.[0]}]}")

    d=$(sed 's_public/__' <<< $d) # strip 'public' folder from directory
    # Add topic (directory) field for where the HTML files belong
    jq -n --arg topic "${d%/}" --argjson files "$file_json" '$files + ( .topic = $topic)'

done | jq -n '.topics |= [inputs]' > "public/files.json"  # combine results from for loop into single JSON

