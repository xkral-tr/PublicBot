////////////////////////////////////////
///
///     Log.js
///
////////////////////////////////////////
///    Just simple log thing.
////////////////////////////////////////

const chalk = require('chalk');

const DONE = chalk.bgGreenBright.black('DONE:');
const INFO = chalk.bgBlueBright.black('INFO:');
const ERROR = chalk.bgRed.black('ERROR:');
const COMMAND_ERROR = chalk.redBright('COMMAND ERROR:');
const COMMAND_DONE = chalk.greenBright('COMMAND DONE:');

const InfoLog = (msg) => {
    console.log(INFO, msg);
};

const CmdErrorLog = (msg) => {
    console.log(COMMAND_ERROR, msg);
};

const ErrorLog = (msg) => {
    console.log(ERROR, msg);
};

const DoneLog = (msg) => {
    console.log(DONE, msg);
};

const CmdDoneLog = (msg) => {
    console.log(COMMAND_DONE, msg);
};

const CommandLog = (type, name, msg) => {
    switch (type) {
        case 'ERROR':
            console.log(chalk.bgRed.black(`CMD ${name} ERROR:`), msg);
            break;
        default:
            ErrorLog('Type not valid.');
            break;
    }
};
module.exports = {
    DONE: DONE,
    ERROR: ERROR,
    INFO: INFO,
    COMMAND_ERROR: COMMAND_ERROR,
    COMMAND_DONE: COMMAND_DONE,
    InfoLog: InfoLog,
    DoneLog: DoneLog,
    ErrorLog: ErrorLog,
    CmdErrorLog: CmdErrorLog,
    CmdDoneLog: CmdDoneLog,
    CommandLog: CommandLog,
};
