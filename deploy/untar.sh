# export NODE_ENV=production
# export NVM_BIN=$HOME/.nvm/versions/node/v6.9.0/bin

cd /var/www && \
rm -r free-pooch
tar zxf free-pooch.tgz -C . && \
rm free-pooch.tgz

cd free-pooch
docker-compose stop && docker-compose up -d