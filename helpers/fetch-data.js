import axios from 'axios';


const domaine = "http://127.0.0.1:8000/api/";
// const domaine = "https://meatmarketdanish.com/apt/api/";

const fetch = async (request, method, data, token) => {
    const request_header =
    {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    data = !data ? {} : data;
    method = !method ? "get" : method;
    let response;
    await axios({
        method: method,
        url: domaine + request,
        data: data,
        headers: request_header
    }).then(res => response = res).catch(err => response = err.response);

    return response;
}

export default fetch;

