# export NODE_ENV=production
# export NVM_BIN=$HOME/.nvm/versions/node/v6.9.0/bin

cd /var/www && \
rm -r free-pooch
tar zxvf free-pooch.tgz -C . && \
rm free-pooch.tgz