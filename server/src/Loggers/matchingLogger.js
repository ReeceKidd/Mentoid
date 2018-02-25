/*Logging this creates a new log file everyday.  */
'use strict';
var winston = require('winston')
require('winston-daily-rotate-file')

//Log file directories. 
const logDir = './logs/all/matching/'
const errorDir = './logs/error/matching/'
const infoDir = './logs/info/matching/'
const debugDir = './logs/debug/matching/'

var getNamespace = require('continuation-local-storage').getNamespace;


const tsFormat = () => (new Date()).toLocaleTimeString();

function getLabel(file) {
    var parts = file.split('\\');
    return parts.slice(Math.max(parts.length - 3, 1)).join("/")
};

const logFormatter = function (options) {
    return options.timestamp() + ` ` + options.label + ' ' + options.level.toUpperCase() +
        `: ` + (options.message ? options.message : ``) +
        (options.meta && Object.keys(options.meta).length ?
            ` ` + JSON.stringify(options.meta) : ``) + '\n';
};

const timestamp = function () {
    const d = new Date();
    return d.getHours() + `:` + d.getMinutes() + `:` +
        d.getSeconds() + `m` + d.getMilliseconds();
};

module.exports = function (callingModule) {
    return new winston.Logger({
        transports: [
            new(winston.transports.DailyRotateFile)({
                filename: `${logDir}-mentoid-matching.log`,
                name: 'mainLog',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                prettyPrint: true,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${errorDir}-mentoid-matching-error.log`,
                name: 'errorLog',
                level: 'error',
                prettyPrint: true,
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${infoDir}-mentoid-matching-info.log`,
                name: 'infoLog',
                level: 'info',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                prettyPrint: true,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                formatter: logFormatter,
                json: false
            }),
            new(winston.transports.DailyRotateFile)({
                filename: `${debugDir}-mentoid-matching-debug.log`,
                name: 'debugLog',
                level: 'debug',
                label: getLabel(callingModule.id),
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                formatter: logFormatter,
                json: false
            })
        ],
        exitOnError: false
    });
}