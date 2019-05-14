# pArranger

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![Badge](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu/#/zh_CN)
[![License](https://img.shields.io/npm/l/@angular/cli.svg)](/LICENSE) 

### HOST URL
Our application is hosted in AWC EC2 instance with the link (http://52.15.85.102:3000/)

### Installation

pArranger requires [Node.js](https://nodejs.org/) v4+ and [MongoDB](https://docs.mongodb.com/manual/introduction/) to run.

Install the dependencies and devDependencies and start the server.

if you don't have node installed, please install node.js at first. go to https://nodejs.org/en/download/ 

if you don't have MongoDB installed, please install MongoDB at first. go to https://docs.mongodb.com/manual/installation/


### Clone or download 
```sh
$ git clone https://github.com/Adamkzh/pArranger.git
```

### Client 
To run the app client side, please follow the procedure below

```sh
$ cd pArranger
$ cd client
$ npm install 
$ npm start
```
Runs the app in the development mode.
The react client side is running at http://localhost:3000 

### Server 
To run the app server side, please follow the procedure below

```sh
$ cd pArranger
$ cd server
$ npm install 
$ npm start
```
Runs the app in the development mode.
the server is running under http://localhost:8080 

### Database

To start a MongoDB server 

```sh
$ mongod
```
Sample users' data will be imported to the mongoDB instance automatically when starting the server.

Open http://localhost:3000 to view it in the browser.

## Test Cases of the APP
### Sign In as a user who wants to install solar panels

1. Make sure to **login as User** by selecting on the **right side of the navbar**
2. Click **Get Started Button** on the HOME page, input **an address in the US**: 
3. Wait util the mapbox zooming stops, click next. 
4. Follow the steps. After saving the user info, A user's dashboard will be shown, the user dashboard will only be seen when signed in as a user.

### Sign In as Admin(City Officials)
1. Make sure to **login as Admin** on the ***right side of the navbar***
2. Click **Dashboard** from the nav bar.
