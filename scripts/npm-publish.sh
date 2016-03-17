#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "salemdar/angular2-cookies" ]; then
  npm publish ./dist --tag next --access public
fi