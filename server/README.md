# Server

To import data into mongoDB, run
```
mongoimport --db pArranger --collection panelDB --file dbImport.json --jsonArray
```

## APIs
### Get Users
Get an array of users from database
```
[GET] localhost:8080/api/v1/getUsers
```
(Wip)
