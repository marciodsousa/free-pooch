#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)
    
# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_22009518e18d_key -iv $encrypted_22009518e18d_iv -in id_digitalocean.enc -out id_digitalocean -d
rm id_digitalocean.enc # Don't need it anymore
chmod 600 id_digitalocean
mv id_digitalocean ~/.ssh/id_rsa

npm install -g yarn
npm install -g webpack

cd client
yarn

cd ../server
yarn