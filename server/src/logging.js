/*Logging this creates a new log file everyday.  */
'use strict';
var winston = require('winston')
require('winston-daily-rotate-file')
var fs = require('fs')
//const env = process.env.NODE_ENV || 'development';
const logDir = './log/'
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();

function getLabel(file) {
    var parts = file.split('\\');
    return parts.slice(Math.max(parts.length - 3, 1)).join("/")
};

const logFormatter = function (options) {
    // Return string will be passed to logger.

    return options.timestamp() + ` ` + options.label + ' ' + options.level.toUpperCase() +
        `: ` + (options.message ? options.message : ``) +
        (options.meta && Object.keys(options.meta).length ?
            ` ` + JSON.stringify(options.meta) : ``);
};

const timestamp = function () {
    const d = new Date();
    return d.getHours() + `:` + d.getMinutes() + `:` +
        d.getSeconds() + `m` + d.getMilliseconds();
};

module.exports = function (callingModule) {
    return new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                timestamp: tsFormat,
                colorize: true
              }),
            new(winston.transports.DailyRotateFile)({
                filename: `${logDir}/-mentoid.log`,
                name: 'mainLog',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                colorize: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${logDir}/errors/-mentoid-error.log`,
                name: 'errorLog',
                level: 'error',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                colorize: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${logDir}/info/-mentoid-info.log`,
                name: 'infoLog',
                level: 'info',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                colorize: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${logDir}/verbose/-mentoid-verbose.log`,
                name: 'verboseLog',
                level: 'verbose',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                colorize: true,
                formatter: logFormatter,
                json: false
            })
        ]
    });
};