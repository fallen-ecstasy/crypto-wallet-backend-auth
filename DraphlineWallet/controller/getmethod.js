const path = require('path');
const express = require('express');

const getIndex = (req,res) =>{
    res.sendFile(path.join(__dirname,"../views/index.html"));
}

const getLogin = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/login.html"));
}

const getRegister = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/register.html"));
}

const getForget = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/forget.html"));
}
module.exports = { getIndex , getLogin , getRegister , getForget};