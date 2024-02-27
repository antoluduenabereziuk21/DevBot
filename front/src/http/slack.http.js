const {api} = require('./config');
const {NotFoundDataException} = require("../exceptions/handler.class");

const postSlack = async (data) => {
    try {
        const response = await api.post(process.env.SLACK_URL, data,{
            headers: {
                'Content-Type': 'application/json'
            }})
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw new NotFoundDataException(error.message);
    }
}

module.exports = {postSlack};