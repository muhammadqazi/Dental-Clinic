# DENTAL CLINIC
In this project, you are asked to design and implement a database that will store all the necessary information for a Dentist Clinic. After designing the database you will implement a software which will insert, delete and update data.


Clone the project

```
git@github.com:muhammadqazi/Dental-Clinic.git
```

Install the dependencies

```
npm install 
```

Install nodemon

```
npm i -g nodemon
```

Run the dev server

```
nodemon start
```

# ENVIRONMENT VARIABLES

```
export PORT=

export DB_HOST=
export DB_USER=
export DB_PASS=
export DB_NAME=

export JWT_SECRET=
export JWT_EXPIRE=


export COOKIE_EXPIRE=
```

# SERVER DEPLOYMENT

Install node

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt install nodejs

node --version
```

Clone the project

```
cd yourproject
npm install
npm start
```

Stop the app and start it with the pm2, pm2 runs the app in background

```
sudo npm i pm2 -g
pm2 start app_name 
```
In the project direct instead of app name write main file name ex: server.js

Other pm2 commands

```
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs
pm2 flush (Clear logs)
```

Start pm2 on startup

```
pm2 startup ubuntu
```

Enable firewall

```
sudo ufw enable
sudo ufw status
```

Make sure these ports are allowed by firewall. Port 22 (ssh) , Port 80 (http) and Port (443) tcp https. If not allow them by,

```
sudo ufw allow ssh 
sudo ufw allow http 
sudo ufw allow https 
```

Install nginx this will redirect your server to port 80

```
sudo apt install nginx
```

Edit the nginx file for your server

```
sudo nano /etc/nginx/sites-available/default
```

In the location object, write your server port number 

```
server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:4444; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

Check the Nginx config, it will return sucessfull message if the file is configured correctly

```
sudo nginx -t
```

Restart the nginx server

```
sudo service nginx restart
```

# DATABASE SETUP

Install mysql

```
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql.service
```

Alter the password for root

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password'
```

Access the database

```
mysql -u root -p
```
