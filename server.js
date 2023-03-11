
const express = require('express');
const bodyParser= require ('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const {handleSignIn}=require('./Controllers/handleSignIn');
const {handleRegistration}=require('./Controllers/handleRegister');
const profile=require('./Controllers/profile');
const image =require('./Controllers/image');
const {handleClarifaiCalls}= require('./Controllers/handleClarifaiCalls');

//handeling Clarifai API calls and consoling on the node server
// handleClarifaiCalls('https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg');
//connecting to postgress using knex.js library...
const db=knex({
            client: 'pg',
            connection: {
            host : process.env.dburl,
            port : 5432,
            user : 'postgres',
            password : process.env.dbPassword,
            database : 'postgres'
            }
        });


const app=express();
app.use(bodyParser.json()); // body-parser is a middleware.
app.use(cors());

app.get('/',(req,res)=>profile.handleLoadUsers(req,res,db));

//signin endpoint
app.post('/signin',(req,res)=>handleSignIn(req,res,db,bcrypt));

//register new user endpoint
app.post('/register',(req,res)=>handleRegistration(req,res,db,bcrypt));

//get user details endpoint
app.get('/profile/:id',(req,res)=>profile.handleProfileUpdate(req,res,db));

//update entries endpoint
app.put('/image',
cors({
    origin: '*',
    credentials: true
  }),
  (req,res)=>image.handleImageCalls(req,res,db));
const PORT=process.env.PORT||3001;

app.listen(PORT, function(){
    console.log('app is running on port', PORT);
});


//3. update image entry while passing user id or something unique params.

//4. respond with face position and bounding box
