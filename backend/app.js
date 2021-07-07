require("dotenv").config();
const express = require("express");
const database = require("./models/database");

test();
async function test(){
    console.log(await database.getOne('SELECT * FROM `users`'));
}