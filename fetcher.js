const axios = require("axios")
const React = require('react')

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

    async get() {
        React.useEffect(() => {
            axios
                .get("http://tehr10.cis.strath.ac.uk:5055/")
                .then((response) => {
                    if (response.status === 200) {
                        console.log('connection success')
                        return {
                            statusCode: response.status,
                            body: {
                                scarlet: 'ONLINE',
                                ermsg: 'http request succeeded'
                            }
                        }
                    } else {
                        console.log('connection failure on SCARLET backend')
                        return {
                            statusCode: response.status,
                            body: {
                                scarlet: 'OFFLINE',
                                ermsg: 'http request failed'
                            }
                        }

                    }
                })
                .catch(err => {
                    console.log('connection failed via catch in get request')
                    console.log(err.message)
                    return {
                        statusCode: 200,
                        body: {
                            scarlet: 'OFFLINE',
                            ermsg: 'http request failed'
                        }
                    }
                })
        }, [])
    },
}

            //
            // const response = axios({
            //     method: 'GET',
            //     url: "http://tehr10.cis.strath.ac.uk:5055/",
            // });


