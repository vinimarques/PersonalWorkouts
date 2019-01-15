
server() {
	### copy server files
	cp -R ./server/controllers ../personal-v2rm-com-br
	cp -R ./server/models ../personal-v2rm-com-br
	cp -R ./server/services ../personal-v2rm-com-br
	cp ./server/index.js ../personal-v2rm-com-br
	cp ./server/package.json ../personal-v2rm-com-br
}

manager() {
	### build and copy manager dist
	cd manager
	npm run build
	cd ..
	rm -R ../personal-v2rm-com-br/manager/dist
	cp -R ./manager/dist ../personal-v2rm-com-br/manager
}

app() {
	### build and copy app dist
	cd app
	npm run build
	cd ..
	rm -R ../personal-v2rm-com-br/app/dist
	cp -R ./app/dist ../personal-v2rm-com-br/app
}

if [ "$1" = "app" ]
then
	echo "Run app"
   app
elif [ "$1" = "manager" ]
then
	echo "Run manager"
   manager
elif [ "$1" = "server" ]
then
	echo "Run server"
   server
else
	echo "Run app, manager, server"
   server
	app
	manager
fi
