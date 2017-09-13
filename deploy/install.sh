#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)
    
# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_22009518e18d_key -iv $encrypted_22009518e18d_iv -in do_deploy_key.enc -out do_deploy_key -d
rm do_deploy_key.enc # Don't need it anymore
chmod 600 do_deploy_key
mv do_deploy_key ~/.ssh/id_rsa

cat ~/.ssh/id_rsa

npm install -g yarn
npm install -g webpack

cd client
yarn

cd ../server
yarn