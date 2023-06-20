const axios = require("axios")
const React = require('react')

module.exports = {
    async Doget() {
        let URL = "http://tehr10.cis.strath.ac.uk:5055/"
        try {
            let response = await axios.get(URL);
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

    async Handler(request) {
        let URL = "http://tehr10.cis.strath.ac.uk:5055/"
        let rasa_format = {
            "sender": "user",  // sender ID of the user sending the message
            "message": request
        }
        try {
            let response = await axios.post(URL, rasa_format);
            let to_return = await response.data;
            return {
                statusCode: 200,
                body: {
                    scarlet: to_return.text,
                    ermsg: 'Success'
                }
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: {
                    scarlet: 'Response failed',
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