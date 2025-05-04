#!/bin/bash

# Update the .gitignore file to ensure node_modules is properly ignored
echo "Making sure node_modules is in .gitignore..."

# Remove node_modules from git tracking
echo "Removing node_modules from Git tracking..."
git rm -r --cached node_modules
git rm -r --cached frontend/node_modules
git rm -r --cached backend/node_modules

# Commit the changes
echo "Committing the changes..."
git add .gitignore
git commit -m "Remove node_modules from Git tracking"

echo "Done! Now you can push these changes to your repository."
echo "Use: git push origin master"