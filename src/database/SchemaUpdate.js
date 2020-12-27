////////////////////////////////////////
///
///     SchemaUpdate.js
///
////////////////////////////////////////
///     Use this if you need to update
///     schemas
////////////////////////////////////////

const { ErrorLog, DoneLog } = require('../utils/Log');
const ServerSchema = require('./ServerSchema');
const ConnectToDatabase = require('./ConnectToDatabase');

// DOTENV CONFIG
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

// ! BE CAREFUL.
// ! THIS CAN BE DANGEROUS.

// ? First you need to add or remove stuffs to schema.
// ? Then go to SchemaDefault.js and add or remove stuffs to default schema too.
// ? Finally run this file.
// ? This code will update all schemas.
// ? $ yarn run updateSchema

// ? Query. Write your changes.
// ? $unset: Delete these.
// ? $set: Add something

// ? When you update all documents.
// ? Please leave query blank.

const query = {};

// ? Schema
const schema = ServerSchema;

// ? Connect to database
ConnectToDatabase()
    .then(() => {
        DoneLog('Connected to Database');
        // ? Then update changes
        schema.updateMany({}, query, (err, raw) => {
            console.log(raw);
            if (err) ErrorLog('Update failed!');
            else DoneLog('Updated!', 'RESULT:', raw);
            mongoose.connection.close();
        });
    })
    .catch((err) => {
        ErrorLog(err);
    });
