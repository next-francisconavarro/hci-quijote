#!/bin/sh 
echo branch $TRAVIS_BRANCH

if [ "$TRAVIS_BRANCH" = "develop" ]; then
  firebase deploy -m "build $TRAVIS_BUILD_NUMBER" --non-interactive --token "$FIREBASE_TOKEN"
fi
