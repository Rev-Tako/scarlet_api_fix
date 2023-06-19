const axios = require("axios")

module.exports = {
    async handler(request) {
        let rasa_format = {
            "sender": "user",  // sender ID of the user sending the message
            "message": request
        }
        try {
            const response = axios({
                method: 'POST',
                url: 'http://tehr10.cis.strath.ac.uk:5055/', //webhooks/rest/webhook', //"http://localhost:5002/webhooks/rest/webhook",
                body: rasa_format,
            });
            return {
                statusCode: 200,
                body: {
                    scarlet: response.text,
                    ermsg: 'Success'
                }
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: {
                    scarlet: 'Response failed',
                    ermsg: 'Error: disconnect between fetcher and SCARLET'
                },
            }
        }
    },

    get() {
            const response = axios({
                method: 'GET',
                url: "http://tehr10.cis.strath.ac.uk:5055/",
            });
            while (response.readyState === 'pending') {
                if (response.readyState === 'done'){
                    break
                }
            }
            if (response.success) {
                return {
                    statusCode: 200,
                    body: {
                        scarlet: 'ONLINE',
                        ermsg: 'http request succeeded'
                    }
                }
            } else {

                if (response.error.message.length > 0) {
                    return{
                        statusCode: 200,
                        body: {
                            scarlet: 'OFFLINE',
                            ermsg: response.error.message},
                    }
                }else{
                return {
                    statusCode: 200,
                    body: {
                        scarlet: 'OFFLINE',
                        ermsg: 'http request failed for unknown reason'},
                }
                }
            }
    }
}
