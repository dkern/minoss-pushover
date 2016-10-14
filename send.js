"use strict";

var Pushover = require("pushover-notifications");
var message = require("./src/message");

// http://localhost:8080/pushover/message?to=

module.exports = function(config, params, respond, error) {
    var appName = params.app || "default";

    // noinspection JSUnresolvedVariable
    if( !config.apps[appName] ) {
        return error("unknown app");
    }

   // noinspection JSUnresolvedVariable
    var app = config.apps[app];
    app.onerror = function(err) {
        return error(err.message);
    };

    var pushover = new Pushover(app);

    var message = {
        title: 'Haustür',
        message: 'wurde geöffnet',
        device: 'Nexus6P',
        url: "http://m.eisbehr.de/i5wosjc7",
        url_title: "show surveillance",
        priority: 1
    };

    // send message
    pushover.send(message, function(err, result) {
        if( err ) {
            return error(err.message);
        }

        respond({
            success: true,
            pushover: isJson(result) || result
        });
    });
};