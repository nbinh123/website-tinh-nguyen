import axios from "axios";


// cấu hình lại cái này
async function putAPI(url, data, callback) {
  await axios.put(url, data)
    .then(response => {
      if(callback !== undefined){
        callback(response.data)
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export default putAPI;