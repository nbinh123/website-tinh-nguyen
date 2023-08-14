import axios from "axios";

async function patchAPI(url, data) {
    await axios.patch(url, data)
        .then(function (response) {
            console.log("Đã cập nhật dữ liệu: PATCH")
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default patchAPI;