# BackEnd --- 
## Project: SPACE JUMP
* Jesús Martín Moreno
* Antonio Luis Martinez Perales
* Enric Pina Navarro
* Xavi Roca Vilalta
* Cristian varela Casas


## How to install in local environment

Get repository
```sh
git clone https://github.com/Spaice-Jump/BackEnd.git
```

Install dependencies with:
```sh
npm install
```

Install **MongoDB**

* Access to [MongoDB-WebSite](https://www.mongodb.com/)
* Search for "Install Community Edition on _your_platform_ (Linux, Windows, macOS)

**.env** file (sample file: .env.example)
```js
MOGODB_CONNECTION_STR=mongodb://127.0.0.1:27017/spacejump
```

Checking MongoDB

* Run NoSQLBooster for MongoDB
* Connect string: `mongodb://localhost:27017` 

## How to run in local environment

Start in development mode:
```sh
npm run dev
```

Result
```log  
> backend@0.0.0 dev
> cross-env DEBUG=backend:* nodemon ./bin/www

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./bin/www`
  backend:server Listening on port 3001 +0ms
Connected to MongoDB in spacejump
```

