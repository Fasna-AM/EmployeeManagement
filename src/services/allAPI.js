import commonApi from "./commonAPI"
import serverURL from "./serverUrl"

export const addUserAPI = async(value)=>{
    return await commonApi("POST",`${serverURL}/employeeDetails`,value)
}

export const getAllUserAPI = async()=>{
    return await commonApi("GET",`${serverURL}/employeeDetails`,'')
}

export const deleteUserAPI = async(userId)=>{
    return await commonApi("DELETE",`${serverURL}/employeeDetails/${userId}`,{})
}

export const getSingleUserAPI = async(userId)=>{
    return await commonApi("GET",`${serverURL}/employeeDetails/${userId}`,'')
}

export const updateUserDetailsAPI = async(userId,updatedDetails)=>{
    return await commonApi("PUT",`${serverURL}/employeeDetails/${userId}`,updatedDetails)
}