# export NODE_ENV=production
# export NVM_BIN=$HOME/.nvm/versions/node/v6.9.0/bin

cd ~/temp_ci && \
tar zxf free-pooch.tgz -C . && \
rm free-pooch.tgz
mv -r free-pooch /usr/share/nginx/html/free-pooch/versions/
cd /usr/share/nginx/html/free-pooch/versions/free-pooch
yarn prod:stop
yarn prod:start