const axios = require("axios")
const React = require('react')

module.exports = {
    async Doget() {
        let scarletURL = "http://tehr10.cis.strath.ac.uk:5055/"
        try {
            let response = await axios.get(scarletURL);
            let to_return = await response.data;
            //console.log(to_return);
            return {
                statusCode: 200,
                body: {
                    scarlet: to_return,
                    ermsg: 'http request succeeded'
                }
            }
        } catch (err) {
            console.log(err.message)
            return{
                statusCode: 200,
                body: {
                    scarlet: 'OFFLINE',
                    ermsg: 'http request failed'
                }
            }
        }
    },

    async Handler(user_message, user_id) {
        try {
            let response = await axios.post(
                "http://tehr10.cis.strath.ac.uk:5055/webhooks/rest/webhook",
                {
                    "sender": user_id,  // sender ID of the user sending the message
                    "message": user_message.body,
                },
                );
            let to_return = await response;
            return {
                statusCode: 200,
                body: {
                    scarlet: to_return.data,
                    ermsg: 'Success'
                }
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: {
                    scarlet: [{recipient_id: user_id, text: "no returned message from SCARLET, check server online and try again"}],//err.message,//'Response failed',
                    ermsg: 'Error: disconnect between API and SCARLET'
                },
            }
        }
    }
}

            //
            // const response = axios({
            //     method: 'GET',
            //     url: "http://tehr10.cis.strath.ac.uk:5055/",
            // });


 /*   if (response.status === 200) {
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

            axios
                .get

*/