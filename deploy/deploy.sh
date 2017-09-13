#!/bin/bash

set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    git init
        
    git remote add deploy "root@146.185.176.28:/var/www/free-pooch"
    git config user.name "Travis CI"
    git config user.email "marciodesousa16+travisCI@gmail.com"
    
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi