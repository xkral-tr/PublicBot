////////////////////////////////////////
///
///     FindAndDo.js
///
////////////////////////////////////////
///     Find And DO Stuff
////////////////////////////////////////

const { CmdDoneLog, CmdErrorLog, ErrorLog } = require('../utils/Log');
const { findOneAndUpdate } = require('./ServerSchema');

const FindOne = (schema, query) => {
    return new Promise((resolve, reject) => {
        schema.findOne(query, (err, result) => {
            if (err) {
                ErrorLog(err);
                reject('Not found');
            } else {
                resolve(result);
            }
        });
    });
};

const Create = (object, schemaName) => {
    return new Promise((resolve, reject) => {
        object
            .save()
            .then((result) => {
                CmdDoneLog(
                    `${
                        schemaName[0].toUpperCase() + schemaName.slice(1)
                    } created succesfully!`
                );
                resolve(result);
            })
            .catch((err) => {
                CmdErrorLog(
                    `Creating ${schemaName.toLowerCase()} failed. ERR: ${err}`
                );
                reject('Failed');
            });
    });
};

const FindAndUpdate = (schema, query, update) => {
    return new Promise((resolve, reject) => {
        schema.findOneAndUpdate(query, update, { new: true }, (err, raw) => {
            if (err) {
                CmdErrorLog('Update failed.');
                reject(err);
            } else {
                CmdDoneLog('Updated succesfully');
                resolve(raw);
            }
        });
    });
};

const Update = (schema, query, update) => {
    schema.updateOne(query, update, (err, raw) => {
        if (err) {
            CmdErrorLog('Update failed.');
        } else {
            CmdDoneLog('Updated succesfully');
        }
    });
};

const UpdateOrCreate = (schema, object, query, update, returnUpdated) => {
    return new Promise((resolve, reject) => {
        if (returnUpdated) {
            FindAndUpdate(schema, query, update)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    if (err) reject(err);
                    else {
                        Create(object, schema.collection.collectionName)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((err2) => {
                                reject(err2);
                            });
                    }
                });
        } else {
            FindOne(schema, query)
                .then((result) => {
                    if (result.length != 0) {
                        Update(schema, query, update);
                    } else {
                        Create(object, schema.collection.collectionName);
                    }
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};

const FindOrCreate = (schema, object, query) => {
    return new Promise((resolve, reject) => {
        FindOne(schema, query)
            .then((result) => {
                if (result) resolve(result);
                else
                    Create(object, schema.collection.collectionName).then(
                        (result) => {
                            resolve(result);
                        }
                    );
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    FindOne: FindOne,
    Update: Update,
    Create: Create,
    UpdateOrCreate: UpdateOrCreate,
    FindOrCreate: FindOrCreate,
};
