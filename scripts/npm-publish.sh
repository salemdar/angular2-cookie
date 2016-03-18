#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "salemdar/angular2-cookie" ]; then
echo "$TRAVIS_BRANCH"
echo $TRAVIS_BRANCH
#  npm publish ./dist --tag next --access public
fi