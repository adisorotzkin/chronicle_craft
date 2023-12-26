import axios from "axios";

const baseUrl="http://localhost:3001";

export const apiService  = () => {
    const postData = async (url, body) => {
        
        try  {
            console.log(`${baseUrl}${url}`);
            await axios.post(`${baseUrl}${url}`,body);
            
        }
        catch (err) {
            console.error(`error ${err}`);
        }

    }

    const getData = async (url) => {
        
        try {
            console.log(`${baseUrl}${url}`);
            return await axios.get(`${baseUrl}${url}`);
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const updateData = async (url, params, body) => {
        try {
            console.log(`${baseUrl}${url}/${params}`);
            console.log(body);
            const res = await axios.put(`${baseUrl}${url}/${params}`, body);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const deleteData = async (url, params,query) => {
        try {
            console.log(url);
            const res = await axios.delete(`${baseUrl}${url}${params}${query}`);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    return { getData, postData, updateData, deleteData }
}