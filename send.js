"use strict";

var Pushover = require("pushover-notifications");
var message = require("./src/message");
var merge = require("./src/merge");
var json = require("./src/json");

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var appName = params.app || params.a || "default";

    // noinspection JSUnresolvedVariable
    if( !params.message && !params.m ) {
        return error("parameter 'message' is required");
    }

    // noinspection JSUnresolvedVariable
    if( !config.apps[appName] ) {
        return error("unknown app");
    }

    // noinspection JSUnresolvedVariable
    var app = config.apps[appName];
    app.onerror = function(err) {
        // add an callback to prevent unhandled thrown errors
    };

    var pushover = new Pushover(app);
    var messageObj = message(config, params, error);

    // send message
    pushover.send(merge({}, messageObj), function(err, result) {
        if( err ) {
            return error(err.message);
        }

        respond({
            success: true,
            request: messageObj,
            pushover: json(result) || result
        });
    });
};