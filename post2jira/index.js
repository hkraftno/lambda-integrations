const https = require('https');


exports.handler = (event, context, callback) => {
    console.log('Received event: ', event);
    var jiraReqBody = {
        'fields': {
            'project': {
                'key': 'GA'
            },
            'summary': event,
            'description': 'Feil på stolpe nummer ' + event.Stolpenummer,
            'issuetype': {
                'name': 'Bug'
            }
        }
    };
    
    console.log('Jira request body: : ', jiraReqBody);

    const options = {
        hostname: "hooks.slack.com",
        method: "POST",
        path: "/services/TANLS4HJ6/BD9KUM5QT/waHzmOlQ0I94f5g8Q5rS4jVg",
    };
    
    const slackmessage = {
            "text": JSON.stringify(jiraReqBody, null, 4)
        };

    const req = https.request(options,
        (res) => res.on("data", () => callback(null, "OK")))
    req.on("error", (error) => callback(null, JSON.stringify(error)));
    req.write(JSON.stringify(slackmessage, null, 4));
    req.end();

    callback(null, `Success`);
};
