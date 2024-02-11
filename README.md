# Project Name

Sample node.js application, Implemented with using express.js frame work and MongoDB and Node.js

## Installation

please run the "npm i" command to install the dependecies after cloning the project
and execute "npm run start" command to run the server

## Schema

Created a user_profile Schema
const userSchema = new mongoose.Schema({
fullName: {
type: String,
required: true,
min: 3,
},
email: {
type: String,
lowercase: true,
trim: true,
required: true
},
mobileNumber: {
type: String,
trim: true,
required: true,
unique: true
},
uniqueId: { // Generating another uniqueid to overcome the expousre of the mongodb \_id's (Security purpose)
type: String,
default: () => uuidv4(),
},
isAdmin: { // user who has isAdmin as true will only able to delete the documents
type: Boolean,
default: false
},
description: {
type: String
}

}, { timestamps: true });

## API Endpoints

Create a new user
METHOD : POST
URL : http://localhost:500/api/users
REQ BODY : {
"fullName": "Saikumar",
"mobileNumber": "9567545826"
"email": "abc@gmail.com",
"description" : ""
}

Update a user
METHOD : PUT
URL : http://localhost:500/api/users/b421ee06-ffd5-4d2a-9e34-1d198f68cb5c
REQ BODY : {
"fullName": "Saikumar",
"mobileNumber": "9567545826"
"email": "abc@gmail.com",
"description" : "",
"isAdmin" : true
}

Generate User-Access-Token
METHOD : GET
URL : http://localhost:5000/api/users/generate-token/9567545826

Get all Users
METHOD : GET
URL : http://localhost:5000/api/users

Get User by id
METHOD : GET
URL : http://localhost:5000/api/users/b421ee06-ffd5-4d2a-9e34-1d198f68cb5c

Delete a user by id
To execute this api requested user must be admin (only admin can delete the documents , i.e update any user as {isAdmin : true})
METHOD : DELETE
URL : http://localhost:5000/api/users/b421ee06-ffd5-4d2a-9e34-1d198f68cb5c

## Contact

Contact information.
