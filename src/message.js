"use strict";

var json = require("./json");
var merge = require("./merge");

/**
 * build message from given data
 * @param {string} message
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
function buildMessage(message, config, error) {
    var jsonObj, build = {};
    message = message.indexOf("|") !== -1 ? message.split("|") : [message];

    for( var i = 0; i < message.length; i++ ) {
        // skip empty entries
        if( message[i] === "" ) {
            continue;
        }

        // merge from config
        // noinspection JSUnresolvedVariable
        if( config.messages[message[i]] ) {
            // noinspection JSUnresolvedVariable
            merge(build, config.messages[message[i]]);
        }

        // merge from json string
        else if( (jsonObj = json(message[i])) ) {
            merge(build, jsonObj);
        }

        // use string as message
        else if( typeof message[i] === "string" ) {
            build.message = message[i];
        }

        // error on unknown entry
        else {
            return error("message '" + message[i] + "' is unknown");
        }

        jsonObj = null;
    }

    return build;
}

/**
 * overwrite custom parameters in message object
 * @param {object} messageObj
 * @param {object} params
 * @returns {object}
 */
function overwriteParameters(messageObj, params) {
    var replaces = ["device", "title", "url", "url_title", "priority", "timestamp", "sound"];

    for( var i = 0; i < replaces.length; i++ ) {
        if( params[replaces[i]] ) {
            messageObj[replaces[i]] = params[replaces[i]];
        }
    }

    return messageObj;
}

/**
 * helper function to create message object
 * @param {object} config
 * @param {object} params
 * @param {function} error
 * @returns {object|boolean}
 */
module.exports = function(config, params, error) {
    var message;

    message = buildMessage(params.message, config, error);

    if( message) {
        message = overwriteParameters(message, params);
    }

    return message;
};
