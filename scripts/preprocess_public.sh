#!/bin/sh

echo "\nDELETING PREVIOUS HTML FILES"
echo "============================"
# Remove all current html files (incase you removed one of the markdown or notebook files)
rm public/*/*.html

echo "\nCONVERTING MARKDOWN FILES"
echo "============================"
# Convert all markdown files to HTML
./scripts/md_to_html.sh

# echo "\nCONVERTING JUPYTER NOTEBOOKS"
# echo "============================"
# Convert Jupyter notebooks in certain directories to HTML
# ./scripts/ipynb_to_html.sh

echo "\nCREATING JSON WITH FILE INFORMATION"
echo "============================"
# Create a JSON that lists the title and location of each HTML file
./scripts/create_json_for_htmls.sh

echo "\nADDING P5 SKETCHES TO FILE JSON"
echo "============================"
./scripts/add_sketches_to_json.sh
