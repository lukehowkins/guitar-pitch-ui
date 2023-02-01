#!/usr/bin/env sh

# abort on errors
set -e

npm run build

cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll


git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:lukehowkins/guitar-pitch-ui.git main:gh-pages

cd -