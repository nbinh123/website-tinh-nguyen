import axios from "axios"

async function getAPI(url, paramCondition, setState, callback) {

    await axios.get(url, {
        params: paramCondition,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (callback === undefined) {
                setState(response.data)
                return response
            } else {
                callback(response.data)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export default getAPI