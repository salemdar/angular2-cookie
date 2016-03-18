#!/bin/bash
set -ev
echo "$TRAVIS_BRANCH"
echo $TRAVIS_BRANCH
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "salemdar/angular2-cookie" ]; then
#  npm publish ./dist --tag next --access public
fi