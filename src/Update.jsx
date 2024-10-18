import React, { useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleUserAPI, updateUserDetailsAPI } from './services/allAPI'

const Update = () => {

    const { id } = useParams()
    useEffect(() => {
        getSingleUser(id)
    }, [])
    const [userFromHome, setUserFromHome] = useState({})
    const [email, setEmail] = useState("")
    const [isEmailIdInvalid, setIsEmailIdInvalid] = useState(false)
    const [empStatus, setEmpStatus] = useState("")
    const [userDetails, setUserDetails] = useState({
        userName: "",
        emailId: "",
        status: ""
    })


    const userInputValidation = (inputTag) => {
        const { name, value } = inputTag
        if (name == 'email') {
            setUserDetails({ ...userFromHome, emailId: value })
            !!value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/) ? setIsEmailIdInvalid(false) : setIsEmailIdInvalid(true)
        }
    }

    const handleChange = (status) => {
        setEmpStatus(status)
        setUserDetails({ ...userFromHome, status: status })
    };

    const getSingleUser = async (id) => {
        const response = await getSingleUserAPI(id)
        // console.log(response.data);
        setUserFromHome(response.data)


    }

    const updateUserDetails = async() =>{
        const {userName,emailId,status}=userFromHome
        console.log(userName,emailId,status);
        
        if(userName&&emailId&&status){

            await updateUserDetailsAPI(id,userDetails)
            alert("Updation Successfully Completed!!!")

        }else{
            alert("Please fill the form completely!!!")
        }
    }
    // console.log(userFromHome);

    return (
        <div className=' w-100 d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            {
                userFromHome &&
                <>
                
                    <h1 className="fw-bolder">Employee Details </h1>
                    <div className="d-flex mt-5">
                        <label htmlFor="" className='fw-bolder mt-3 me-2'>User Name: </label>
                        <TextField value={userFromHome.userName} onChange={e => setUserDetails({ ...userFromHome, userName: e.target.value })} id="outlined-basic" label="" variant="outlined" />
                           
                            
                    </div>
                    <div className="d-flex mt-5 mb-5">
                        <label htmlFor="" className='fw-bolder mt-3 me-4'>Email Id: </label>
                        <TextField value={userFromHome.emailId} onChange={e => userInputValidation(e.target)} id="outlined-basic" label="" variant="outlined" name='email' />
                    </div>
                    {
                        isEmailIdInvalid &&
                        <div className='text-danger fw-bolder'>
                            * Invalid Email Id
                        </div>
                    }
                    <FormControl className='w-25 '>
                        <InputLabel id="demo-simple-select-label" >{userFromHome.status}</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={empStatus}
                            label="Age"
                            onChange={e => handleChange(e.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="In Active">In Active</MenuItem>
                        </Select>
                    </FormControl>

                    <button onClick={updateUserDetails} className='btn btn-success mt-5 mb-3'>Save</button>
                    <Link to={'/home'}>Employee Details</Link>
                </>
            }
        </div>
    )
}

export default Update