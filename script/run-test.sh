#!/bin/bash
set -e -x

# Verify files exist
files=( "issues.json" "recent-issues.json" )
for file in "${files[@]}"
do
  if [[ -f "$file" ]]; then
    echo "File $file exists."
  else
    echo "File $file does not exist."
    exit 1
  fi
done

# Set the flag `--race` to kill all tasks when a task finished with zero.
"$(npm bin)"/run-p --race "start-selenium" "serve" "build-and-test"
