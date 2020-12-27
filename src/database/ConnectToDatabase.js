////////////////////////////////////////
///
///     ConnectToDatabase.js
///
////////////////////////////////////////
///     Connect to Database
////////////////////////////////////////

const mongoose = require('mongoose');

const ConnectToDatabase = () => {
    // Database Connection
    return new Promise((resolve, reject) => {
        mongoose.connect(
            process.env.DATABASE_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err, db) => {
                if (err) reject(err);

                resolve();
            }
        );
    });
};

module.exports = ConnectToDatabase;
