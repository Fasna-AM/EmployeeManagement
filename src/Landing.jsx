import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addUserAPI } from './services/allAPI'


const Landing = () => {

    const [name,setName]= useState("")
    const [email, setEmail] = useState("")
    const [isEmailIdInvalid, setIsEmailIdInvalid] = useState(false)
    const [empStatus, setEmpStatus] = useState("")
    const [userDetails,setUserDetails] = useState({
        userName : "",
        emailId:"",
        status:""
    })

    const userInputValidation = (inputTag) => {
        const { name, value } = inputTag
        if (name == 'email') {
            setUserDetails({...userDetails, emailId:value})
            !!value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/) ? setIsEmailIdInvalid(false) : setIsEmailIdInvalid(true)
        }
    }

    const handleChange = (status) => {
        setEmpStatus(status)
        setUserDetails({...userDetails, status:status})
    };

    const addEmployeeDetails = async() =>{
       
        const {userName,emailId,status} =userDetails
        // console.log(userName,emailId,status);
        
        if(userName&&emailId&&status){
            try{
                const response = await addUserAPI(userDetails)
                if(response.status>=200 && response.status<300){
                    alert("Registration successfully Completed!!")
                }
                setName("")
                setEmail("")
                setEmpStatus("")
            }catch(err){
                console.log(err);
                
            }
        }else{
            alert("Please fill the form completely")
        }

        
    }
    // console.log(userDetails);
    

    return (
        <div className=' w-100 d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <h1 className="fw-bolder">Employee Management </h1>
            <div className="d-flex mt-5">
                <label htmlFor="" className='fw-bolder mt-3 me-2'>User Name: </label>
                <TextField  onChange={e => setUserDetails({...userDetails, userName:e.target.value})} id="outlined-basic" label="UserName" variant="outlined" />
            </div>
            <div className="d-flex mt-5 mb-5">
                <label htmlFor="" className='fw-bolder mt-3 me-4'>Email Id: </label>
                <TextField  onChange={e => userInputValidation(e.target)} id="outlined-basic" label="EmailId" variant="outlined" name='email' />
            </div>
            {
                isEmailIdInvalid &&
                <div className='text-danger fw-bolder'>
                    * Invalid Email Id
                </div>
            }
            <FormControl className='w-25 '>
                <InputLabel id="demo-simple-select-label" >Status</InputLabel>
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
            
            <button onClick={addEmployeeDetails} className='btn btn-success mt-5 mb-3'>Submit</button>
            <Link to={'/home'}>Employee Details</Link>

        </div>
    )
}

export default Landing