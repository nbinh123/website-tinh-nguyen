import axios from "axios";

function deleteAPI(url, paramCondition, callback) {
    axios.delete(url, {
        params: paramCondition,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (callback !== undefined) {
                callback(response.data)
            } else {
                console.log("Xóa thành công!!")
            };
        })
        .catch(error => {
            console.log(error);
        });
}

export default deleteAPI;