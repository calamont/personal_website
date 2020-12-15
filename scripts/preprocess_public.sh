#!/bin/sh

# Remove all current html files (incase you removed one of the markdown or notebook files)
rm public/*/*.html

# Convert all markdown files to HTML
./scripts/md_to_html.sh

# Convert Jupyter notebooks in certain directories to HTML
# ./scripts/ipynb_to_html.sh

# Create a JSON that lists the title and location of each HTML file
./scripts/create_json_for_htmls.sh
