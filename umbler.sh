### copy server files

cp -R ./server/controllers ../personal-v2rm-com-br
cp -R ./server/models ../personal-v2rm-com-br
cp -R ./server/services ../personal-v2rm-com-br
cp ./server/index.js ../personal-v2rm-com-br
cp ./server/package.json ../personal-v2rm-com-br

### build and copy manager dist
cd manager
npm run build
cd ..
rm -R ../personal-v2rm-com-br/manager/dist
cp -R ./manager/dist ../personal-v2rm-com-br/manager
