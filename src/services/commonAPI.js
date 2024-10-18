import axios from "axios"


const commonApi = async (httpMethod,url,reqbody) =>{
    const requestConfig = {
        method :httpMethod,
        url,
        data : reqbody
    }
    return await axios(requestConfig).then(response=>{
        return response
    }).catch(err=>{
        return err
    })
}

export default commonApi