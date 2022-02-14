
# MoviePool Movie Sharing and Rating App
### This project developed by [Ömer Dinçer](https://github.com/om3rmdinc3r) for Gusto & RemoteTeam NodeJs Bootcamp Final Project
#### Version: 0.1.0

#### Main dev tools used:

`NodeJS & ExpressJS` - `TypeOrm(^0.2.41)` - `MySql` - `Typescript` - `EJS` 

#### Other Dependencies

- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptJS](https://www.npmjs.com/package/bcryptjs)
- [PassportJS](http://www.passportjs.org/)

#### How to run (As Default)

```
1.) Create an .env file like given .env.example file
2.) Create database
3.) Import database credentials on .env file (TYPEORM_HOST/ TYPEORM_DATABASE etc.)
4.) Run these following commands:

    $ yarn or npm i                  - Installs all node modules
    $ 
    $ yarn run dev or npm run dev        - Starts app on port specified .env
5.) Go to http://localhost:{{PORT}} on browser

```

#### How To Use

```
1-) Register
2-) Login using your username/password or Login with Facebook and Google Credentials
3-) Defaultly , no 'Movie' and 'Star' provided.You can created yourself

