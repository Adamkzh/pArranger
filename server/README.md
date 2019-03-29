# Server

To import data into mongoDB, run
```
mongoimport --db pArranger --collection panelDB --file dbImport.json --jsonArray
```
FYI: Use below command to remove all previous records
```
mongo
> use pArranger
> db.dropDatabase()
```

# Table of Contents
* [APIs](#apis)
    * [Get Users](#api-get-users)
    * [Search Users](#api-search-users)
    * [Get one user](#api-get-one-user)
    * [Add user](#api-add-user)
    * [Update user](#api-update-user)
    * [Remove user](#api-remove-user)

## APIs
All APIs will follow the rules below
##### Content-Type: `application/json`
##### On Success
Successful response will always contain `success = true`, result can always be found in `result`.
The response will always look like this:
```
{
    "result": {object(s)},
    "success": true
}
```
##### On Error
Error response will always contain `success = false`, error reason can always be found in `error`.
The response will always look like this:
```
{
    "error": "aReason",
    "success": false
}
```

## [API] Get Users
Get an array of users from database
```
[GET] localhost:8080/api/v1/getUsers
```

#### Query parameters

| Parameters  | Type | Description | Default  | Optional |
| --- |:---:|:---:|:---:| ---:|
| limit | `Int` | Maximum number of records to return | `5` | Yes |
| oldToNew | `String` ('true' or 'false') | Whether to sort from old to new, default is new to old | `false` | Yes |
| updatedAfter | `Number` (Unix Epoch in millisecond) | Return records updated after this date | `null` | Yes |
| updatedBefore | `Number` (Unix Epoch in millisecond) | Return records updated before this date | Now | Yes |

Note: Regular unix Epoch is in second, multiply by 1000 to get it in millisecond. 

#### Returns
##### On Success
```
{
    "result": {
        "oldToNew": false,
        "limit": 5,
        "count": 1000,      // The total number of records matching your request
        "updatedBefore": "2019-03-26T22:16:58.639Z",
        "updatedAfter": "2019-03-25T07:46:40.000Z",
        "data": [
            {
                "_id": "5c9af3d1e89c7b2e70549d20",
                "address": "815 Riverside Dr, San Jose, CA 95125",
                "location": {
                    "lat": "37.31667328501522",
                    "lon": "-121.90200306732642"
                },
                "email": "Nice@people.com.cn",
                "username": "Nice",
                "mountType": "DIY",
                "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
                "watts": 3000,
                "acPower": 120,
                "updatedDate": "2019-03-27T03:53:53.607Z"
            },
            {
                "_id": "5c9af39ce89c7b2e70549d1f",
                "address": "815 Riverside Dr, San Jose, CA 95125",
                "location": {
                    "lat": "37.31667328501522",
                    "lon": "-121.90200306732642"
                },
                "email": "wow@people.com.cn",
                "username": "wow",
                "mountType": "DIY",
                "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
                "watts": 3000,
                "acPower": 120,
                "updatedDate": "2019-03-27T03:53:00.314Z"
            }, 
            //....(more data in array)
        ]
    },
    "success": true
}
```

#### How to implement basic paging 
Basic paging can be implemented by using `updatedBefore` and/or `updatedAfter`

Let's say you want to get **all** users, sorted **new to old** and **5** records per page 
1. First call `/api/v1/getUsers` with parameter `limit=5`
2. On response, remember the **last** record's date
3. When requesting the next page, call endpoint with an additional parameter `updatedBefore=(last record's date)`
4. Next page is shown

## [API] Search Users
Search users in database
```
[GET] localhost:8080/api/v1/searchUsers
```

#### Query parameters

| Parameters  | Type | Description | Default  | Optional |
| --- |:---:|:---:|:---:| ---:|
| q | `String` | The search term | N/A | Required |
| limit | `Int` | Maximum number of records to return | `5` | Yes |
| oldToNew | `String` ('true' or 'false') | Whether to sort from old to new, default is new to old | `false` | Yes |
* When parsing query strings, make sure `encodeURIComponent()` is used (e.g. `[space]` will convert to `%20`)

#### Returns
##### On Success
```
{
    "result": {
        "oldToNew": false,
        "limit": 5,
        "searchTerm": "San Jose, CA",
        "data": [
            {
                "_id": "5c9af3d1e89c7b2e70549d20",
                "address": "815 Riverside Dr, San Jose, CA 95125",
                "location": {
                    "lat": "37.31667328501522",
                    "lon": "-121.90200306732642"
                },
                "email": "Nice@people.com.cn",
                "username": "Nice",
                "mountType": "DIY",
                "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
                "watts": 3000,
                "acPower": 120,
                "updatedDate": "2019-03-27T03:53:53.607Z"
            },
            {
                "_id": "5c9af39ce89c7b2e70549d1f",
                "address": "815 Riverside Dr, San Jose, CA 95125",
                "location": {
                    "lat": "37.31667328501522",
                    "lon": "-121.90200306732642"
                },
                "email": "wow@people.com.cn",
                "username": "wow",
                "mountType": "DIY",
                "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
                "watts": 3000,
                "acPower": 120,
                "updatedDate": "2019-03-27T03:53:00.314Z"
            },
            //....(more data in array)
        ]
    "success": true
}
```

## [API] Get one user
Get one user specified in the query
```
[GET] localhost:8080/api/v1/getUser
```

#### Query parameters
| Parameters  | Type | Description | Default  | Optional |
| --- |:---:|:---:|:---:| ---:|
| _id | `MongoDB ID` | MongoDB's ID string | N/A | Yes* |
| address | `String` | The address of that record | N/A | Yes* |
| email | `String` | Email address | N/A | Yes* |
| username | `String` | Username | N/A | Yes* |
| (Any filed in the record) | (field Type) | N/A | N/A | Yes* |
* At least one query is needed for this API
#### Returns
##### On Success
```
{
    "result": {
        "_id": "5c98aab02ced4da56e3ecfac",
        "address": "68 Cleaves Ave, San Jose, CA 95126",
        "location": {
            "lat": "37.32988452200835",
            "lon": "-121.90699095999273"
        },
        "email": "ndikesrr@digg.com",
        "username": "nrebanksrr",
        "mountType": "Tile",
        "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC",
        "watts": 3600,
        "acPower": 120,
        "updatedDate": "2019-03-23T01:53:14.000Z"
    },
    "success": true
}
```

## [API] Add user
Add a user into database

**Note**: DO NOT assign the value for `_id` and `updatedDate`, they're handled internally, any value in those fields 
will be **ignored**. 
```
[POST] localhost:8080/api/v1/addUser
```

#### Request
```
{
    "user": {
        "address": "815 Riverside Dr, San Jose, CA 95125",
        "location": {
            "lat": "37.31667328501522",
            "lon": "-121.90200306732642"
        },
        "email": "Nice@people.com.cn",
        "username": "Nice",
        "mountType": "DIY",
        "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
        "watts": 3000,
        "acPower": 120
    }
}
```
#### Returns
##### On Success
```
{
    "result": {
        "added": {
            "address": "815 Riverside Dr, San Jose, CA 95125",
            "location": {
                "lat": "37.31667328501522",
                "lon": "-121.90200306732642"
            },
            "email": "Nice@people.com.cn",
            "username": "Nice",
            "mountType": "DIY",
            "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
            "watts": 3000,
            "acPower": 120,
            "updatedDate": "2019-03-27T03:53:53.607Z",
            "_id": "5c9af3d1e89c7b2e70549d20"
        }
    },
    "success": true
}
```

## [API] Update user
Update a user in database
**Note**: `updatedDate` can NOT be manually updated, they're handled internally. 

```
[POST] localhost:8080/api/v1/updateUser
```

#### Request
```
{
    "updateUser": {
        "_id": "5c9af853e89c7b2e70549d21", // Must include "_id" (required)
        "watts": 600
        // Any other fields can be updated
    }
}
```
#### Returns
##### On Success
```
{
    "result": {
        "updated": {
            "_id": "5c9af853e89c7b2e70549d21",
            "address": "815 Riverside Dr, San Jose, CA 95125",
            "location": {
                "lat": "37.31667328501522",
                "lon": "-121.90200306732642"
            },
            "email": "Nice@people.com.cn",
            "username": "wNiceq",
            "mountType": "DIY",
            "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLlZJdTJJxFMZp6C2bd+bWhTXXReuirbtuWuZFMyt1iX04bWlfNmlqoqCCfDZSS1ABwUQ0NSQVVD5ETcCVqLS6yK8EslpttdlFoS6Vp//7urVaLuvdzs357/c8zznvYQBg7FR3vbKwfEzE2u5tR1jhkYR1/kZIR4WodJax/kvgjlscbvLXw/62H5opFcrtXBRbb7H+SYBEDmunKdgK02IbbG/6oHxajSJLAfK7r7D+KiB7UhXWTKtgX7Lg0es2GOd04A4UYSDUi2qvHNdNebjUnsXaVkA6Kgirp5SwEVjhlULqFsIwq0XLrAYP51tgDZlR5arARUPmyh8C4pHKlcbJOhLXgsDXeaxtrKLzRTskY5VbcNAMoYuP8y0Z67+NoPLVJoiGK743+O7Tsyo8UhpWexoQWg5A7hHBEuyGYIhPOSOr9RzY+vQoWkDlq6kQkUj1E/douGvBSGILaGcKFjuEW7CTRzlj4uM4yh2lSNOektACVCTVRC0GyYI6F1rpWR/MqCEmseVuEfoC3ahwlkElS4Q7ex+GE6MxxI6FuPAATiiTYhiSEYGBFPTP1egPPUZxPwfNrxrRNtdMYBPt1lSdjJclR7A6WIPIjAPhrkJM5h/cbE2PUTAko4LdVArqSNRTdXRc46x+Cya9PHMOHJlxWCEwlCkANwaQxeOz4iicx5lBeok8222dwa9HkZUD5bMa9C6awLeV4KwuFXwiMnwsChF/D379vghiqX6EFii2cvZXuco3XEE7bpqvgggiVXMqQjbtSNee5jmTmO++NV8GCLRWwsAyqaVrTJD+e1qgoOdGNLmu3ryOnE1OTz7OqE+uZ+jTDpNN76Xevew4oS83Yf0DNx6fyqIRyN2FkZSoDUcSk/fziHI7cg5lGy9Mk1+VvN15j7P3lBLHEBWbSkTBVP8HrJC/O3IOxUMAAAAASUVORK5CYII=",
            "watts": 600,
            "acPower": 120,
            "updatedDate": "2019-03-27T04:57:40.266Z"
        }
    },
    "success": true
}
```

## [API] Remove user
Remove a user in database

```
[POST] localhost:8080/api/v1/removeUser
```

#### Request
```
{
    "removeUser": {
        "_id": "5c9af853e89c7b2e70549d21"
    }
}
```
#### Returns
##### On Success
```
{
    "result": "success",
    "success": true
}
```