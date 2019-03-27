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

#### Query parameters

| Parameters  | Type | Description | Default  | Optional |
| --- |:---:|:---:|:---:| ---:|
| limit | `Int` | Maximum number of records to return | `20` | Yes |
| oldToNew | `String` ('true' or 'false') | Whether to sort from old to new, default is new to old | `false` | Yes |
| updatedAfter | `Number` (Unix Epoch in millisecond) | Return records updated after this date | `null` | Yes |
| updatedBefore | `Number` (Unix Epoch in millisecond) | Return records updated before this date | Now | Yes |

Note: Regular unix Epoch is in second, multiply by 1000 to get it in millisecond. 

#### Returns
##### On Success
Successful response will always contain `success = true`, result can always be found in `result`.

Content-Type: `application/json`
```
{
    "result": {
        "oldToNew": false,
        "limit": 20,
        "count": 1000,      // The total number of records matching your request
        "updatedBefore": "2019-03-26T22:16:58.639Z",
        "updatedAfter": "2019-03-25T07:46:40.000Z",
        "data": [
            {
                "_id": "5c98b00960e6876fb31c91e0",
                "address": "560 Robert Ave, Santa Clara, CA 95050",
                "location": {
                    "lat": "37.36438918183242",
                    "lon": "-121.94475950059133"
                },
                "email": "11111schritchley0@slate.com",
                "username": "scroot0111",
                "mountType": "Tile",
                "mapImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHxSURBVDjLpVPJiipBEJyP6n/q+7TL6Km/QERBEfTiRdGDB0+CSB1EEUTcyuWg4r622i4oKuZUFKMyvGEej9cQdFeTEZmRmfVGRG//gz9+tNttpdVq6c1mkzUaDYNzbtRqNVatVvVyuaz8KiDIqiDz5XJJx+ORbrebxOFwoNlsRqVSiReLRfVHgS+yeT6fCQ/eu92OTNOk0+kk/0G0UCiY+Xxe/SbwVTZ/kEejEa3XazIMQ2IwGBCqeogwxngmk1GeAsKv/gjYbDZkt9sFaSjJq9WKrFYb9Xo9ms/nMqbT6VAymdSfAqJZDMooFSSbzS5go36/T4vFQghYJbrdruwHqovH4+wpUK/XDTRru91KAWQEnE4nDYdDslisAhb6+HDI8+VyoUgkYjwFxJikAMqHFZAdDofMClFNs0hbmqbJM6oIh8MvgUqlwtBx2IBPkJEVwZPJ5ElGAsTBWigUelkQ89XR+fv9LueNckEej8cS7++a9I1pXK9XyuVyFAgEXk0Uc1Wy2SwH6TEJECEKzyAjKxJARJC5gPJtkdLptJpKpUyMDYH7/V5WM51O5TIhM0QE0fR6veqPq5xIJNRYLMaFJekdPYFnzF0sDwkid7vd6q+XKRqNKsFgUPf7/czn8xkej8cQJOZyuXTxrfz1Nv4rPgFlRDELuo2JKwAAAABJRU5ErkJggg==",
                "watts": 400,
                "acPower": 230,
                "updatedDate": "2019-03-25T10:40:09.198Z"
            }
            ...
        ]
    },
    "success": true
}
```
##### On Error
Error response will always contain `success = false`, error reason can always be found in `error`.

Content-Type: `application/json`
```
{
    "error": "\"updatedBefore\" must be a unix epoch date number in millisecond",
    "success": false
}
```

#### How to implement paging 
Limited paging can be implemented by using `updatedBefore` and/or `updatedAfter`

Let's say you want to get **all** users, sorted **new to old** and **5** records per page 
1. First call `/api/v1/getUsers` with parameter `limit=5`
2. On response, remember the **last** record's date
3. When requesting the next page, call endpoint with an additional parameter `updatedBefore=(last record's date)`
4. Next page is shown
