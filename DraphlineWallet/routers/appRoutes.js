const express = require('express');
const path = require('path');
const route = express.Router();
require("../config/dbConnection/connection");
const registerSchema = require("../config/model/registerationSchema");
const { getIndex ,getLogin ,getRegister , getForget} = require("../controller/getmethod");
const { postRegister , postLogin , postForget , postNewRegister } = require("../controller/postmethod");
route.use(express.json())
route.use(express.urlencoded({extended:true})); 

route.get("/",getIndex);
route.get("/login",getLogin);
route.get("/register",getRegister);
route.get("/forget",getForget);

route.post("/register",postRegister);
route.post("/login",postLogin);
route.post("/forget",postForget);
route.post("/newRegister",postNewRegister);

module.exports=route;