const axios = require("axios")

module.exports = {
    async handler(request) {
        let rasa_format = {
            "sender": "user",  // sender ID of the user sending the message
            "message": request
        }
        try {
            const response = await axios({
                method: 'POST',
                url: "http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook",
                body: rasa_format,
            });
            return {
                statusCode: 200,
                body: {scarlet: response.text}
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: '',
                ermsg: 'Error: disconnect between fetcher and SCARLET'
            }
        }
    },

    async get() {
        try {
            const response = await axios({
                method: 'GET',
                url: "http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook",
            });
            return {
                statusCode: 200,
                body: {scarlet: 'ONLINE'}
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: {scarlet: 'OFFLINE'},
                ermsg: 'Error: SCARLET disconnected'
            }
        }
    }
}
