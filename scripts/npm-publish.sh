#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "salemdar/angular2-cookie" ]; then
#  npm publish ./dist --tag next --access public
echo $TRAVIS_BRANCH
echo "$TRAVIS_BRANCH"
fi