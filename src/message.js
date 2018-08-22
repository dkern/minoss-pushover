'use strict';

let json = require('./json');
let merge = require('./merge');

/**
 * build message from given data
 * @param {string|array} message
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
function buildMessage(message, config, error) {
    let jsonObj, build = {};

    message = message || 'default';
    message = message.indexOf('|') !== -1 ? message.split('|') : [message];

    message.forEach(msg => {
        // skip empty entries
        if (msg === '') {
            return;
        }

        // merge from config
        if (config.messages[msg]) {
            // noinspection JSUnresolvedVariable
            merge(build, config.messages[msg]);
        }

        // merge from json string
        else if ((jsonObj = json(msg))) {
            merge(build, jsonObj);
        }

        // use string as message
        else if (typeof msg === 'string') {
            build.message = msg;
        }

        // error on unknown entry
        else {
            return error(`message '${msg}' is unknown`);
        }

        jsonObj = null;
    });

    return build;
}

/**
 * overwrite custom parameters in message object
 * @param {object} messageObj
 * @param {object} params
 * @returns {object}
 */
function overwriteParameters(messageObj, params) {
    let replaces = {
        d:  'device',
        t:  'title',
        u:  'url',
        ut: 'url_title',
        p:  'priority',
        ts: 'timestamp',
        s:  'sound'
    };

    Object.keys(params).forEach(key => {
        // by shorthand
        if (params[key]) {
            messageObj[replaces[key]] = params[key];
        }

        // by name
        if (params[replaces[key]]) {
            messageObj[replaces[key]] = params[replaces[key]];
        }
    });

    return messageObj;
}

/**
 * helper function to create message object
 * @param {object} config
 * @param {object} params
 * @param {function} error
 * @returns {object|boolean}
 */
module.exports = (config, params, error) => {
    let message = buildMessage(params.message || params.m, config, error);

    if (message) {
        message = overwriteParameters(message, params);
    }

    return message;
};
