"use strict";

var Pushover = require("pushover-notifications");
var message = require("./src/message");
var json = require("./src/json");

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var appName = params.app || params.a || "default";

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
    pushover.send(messageObj, function(err, result) {
        if( err ) {
            return error(err.message);
        }

        respond({
            success: true,
            pushover: json(result) || result
        });
    });
};