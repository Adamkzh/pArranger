# pArranger


### Installation

pArranger requires [Node.js](https://nodejs.org/) v4+ and [MongoDB](https://docs.mongodb.com/manual/introduction/) to run.

Install the dependencies and devDependencies and start the server.

if you don't have node installed, please install node.js at first. go to https://nodejs.org/en/download/ 

if you don't have MongoDB installed, please install node.js at first. go to https://docs.mongodb.com/manual/installation/


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

To start MongoDB server

```sh
$ mongod
```

To import sample data into mongoDB
1. Downlaod [Sample Data](https://drive.google.com/open?id=1P_xRJbJMn_P7vDBPV9rMT34c--0ijmO8)
and make sure it's named `dbImport.json`
2. Then run the following command in the same directory as `dbImport.json`
```
mongoimport --db pArranger --collection panelDB --file dbImport.json --jsonArray
```
FYI: Use below command to remove all previous records
```
mongo
> use pArranger
> db.dropDatabase()
```

Open http://localhost:3000 to view it in the browser.
