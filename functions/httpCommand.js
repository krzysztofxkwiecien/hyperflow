const request = require('requestretry');
const createJobMessage = require('../common/jobMessage').createJobMessage;

async function httpCommand(ins, outs, context, cb) {

    let jobMessage = JSON.stringify(createJobMessage(ins, outs, context));

    console.log("Sending jobMessage: " + jobMessage);

    request.post({
        timeout: 6000000,
        url: `http://${context.executor.executable.toLowerCase()}-worker.default.svc.cluster.local`,
        body: jobMessage,
        maxAttempts: 1,
        headers: {'Content-Type': 'application/json', 'Accept': '*/*'}
    }).then((response) => {
        console.log("Task: " + context.taskId + " completed successfully, code " + response.statusCode);
        cb(null, outs);
    })
        .catch(function (error) {
            console.log("Task: " + context.taskId + " error: " + JSON.stringify(error));
            cb(error, outs);
        });
}

exports.httpCommand = httpCommand;