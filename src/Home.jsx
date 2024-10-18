import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUserAPI, getAllUserAPI } from './services/allAPI'

const Home = () => {
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const response = await getAllUserAPI()
        // console.log(response.data);
        setUserDetails(response.data)

    }

    const deleteUser = async (id)=>{
        await deleteUserAPI(id)
        getAllUsers()
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <h1 className="fw-bolder">Employee Details</h1>
            <table className='table shadow w-75 mt-5'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email Id</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userDetails?.length > 0 ?
                            userDetails.map((user,index) => (
                                <tr key={user?.id}>
                                    <td>{index+1}</td>
                                    <td>{user?.userName}</td>
                                    <td>{user?.emailId}</td>
                                    <td>{user?.status}</td>
                                    <td>
                                        <Link to={`/update/${user?.id}`} className='btn bg-primary text-white'>Update</Link>
                                    </td>
                                    <td>
                                       <button onClick={()=>deleteUser(user?.id)} className='btn'><i className='fa-solid fa-trash text-center  text-danger' /></button> 
                                    </td>
                                </tr>
                            ))
                            :
                            <div className='text-danger fw-bolder'>
                                No Employees Details
                            </div>
                    }
                </tbody>
            </table>
            <Link className='mt-3' to={'/'}>Back to Registration</Link>

        </div>
    )
}

export default Home