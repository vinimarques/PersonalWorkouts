echo "+ update apt repository"
apt-get -q -y update 1>/dev/null 2>&1

echo "+ install htop"
apt-get -q -y install htop 1>/dev/null 2>&1

echo "+ install httpd"
apt-get -y install nginx-extras 1>/dev/null 2>&1

echo "+ install ntp"
ntpdate ntp.ubuntu.com 1>/dev/null 2>&1
apt-get -y install ntp 1>/dev/null 2>&1

echo "+ configure vhost"
rm -f /etc/nginx/sites-enabled/*
cp -f /root/PersonalWorkouts/provision/httpd/default /etc/nginx/sites-enabled/shared
service nginx restart 1>/dev/null 2>&1

echo "+ Installing Imagemagick"
apt-get -q -y install imagemagick 1>/dev/null 2>&1

echo "+ install git, make, curl"
apt-get -q -y install git make curl 1>/dev/null 2>&1

echo "+ install redis server and flush"
apt-get -q -y install redis-server 1>/dev/null 2>&1
redis-cli FLUSHALL

echo "+ install mysql server and client"
echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
apt-get -q -y install mysql-server mysql-client 1>/dev/null 2>&1
service mysql restart 1>/dev/null 2>&1
echo -e "[mysqld]\nuser=root\npassword=root" | tee ~/.my.cnf 1>/dev/null 2>&1

echo "+ provisioning database"
bash /root/PersonalWorkouts/provision/database-droplet.sh
if [ $? -ne 0 ]; then
  echo "ERROR: failed on database provisioning"
fi

echo "+ install node.js and npm"
git clone https://github.com/visionmedia/n.git /opt/n  1>/dev/null 2>&1
cd /opt/n
make install  1>/dev/null 2>&1
n 8.11.3 1>/dev/null 2>&1

echo "+ install yarn"
npm install -g yarn 1>/dev/null 2>&1

echo "+ install pm2"
npm install -g pm2 1>/dev/null 2>&1

echo "+ project setup"
cd /root/PersonalWorkouts/server
yarn install 1>/dev/null 2>&1
cd /root/PersonalWorkouts
npm install 1>/dev/null 2>&1
pm2 startOrRestart ecosystem.json 1>/dev/null 2>&1

echo "+ install ssh protection"
apt install -y fail2ban

exit 0
