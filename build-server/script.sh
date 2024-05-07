#!/bin/bash
export GIT_REPO_URL="$GIT_REPO_URL"

# Ensure GIT_REPO_URL is set and non-empty
if [ -z "$GIT_REPO_URL" ]; then
    echo "Error: GIT_REPO_URL is not set or empty."
    exit 1
fi

echo "Cloning repository: $GIT_REPO_URL"

# Clone the repository into code folder
mkdir code
cd code
git clone "$GIT_REPO_URL" .

echo "Clone complete"

echo "Running main.js"
exec node /home/app/main.js 
