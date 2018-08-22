'use strict';

let Pushover = require('pushover-notifications');
let message = require('./src/message');
let merge = require('./src/merge');
let json = require('./src/json');

module.exports = (config, params, respond, error) => {
    // noinspection JSUnresolvedVariable
    let appName = params.app || params.a || 'default';

    // noinspection JSUnresolvedVariable
    if (!params.message && !params.m) {
        return error('parameter "message" is required');
    }

    // noinspection JSUnresolvedVariable
    if (!config.apps[appName]) {
        return error('unknown app');
    }

    // noinspection JSUnresolvedVariable
    let app = config.apps[appName];
    app.onerror = err => {
        // add an callback to prevent unhandled thrown errors
    };

    let pushover = new Pushover(app);
    let messageObj = message(config, params, error);

    // send message
    pushover.send(merge({}, messageObj), (err, result) => {
        if (err) {
            return error(err.message);
        }

        respond({
            success: true,
            request: messageObj,
            pushover: json(result) || result
        });
    });
};