import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Account = (props) => {

    const [user, setUser] = useState({})

    useEffect(() => {

        axios.get("http://dct-user-auth.herokuapp.com/users/account", {
            
            headers : {
                
                'x-auth' : localStorage.getItem('token')
            
            }})
        .then((response) => {

            const result = response.data

            setUser(result)

        })
        .catch((err) => {

            console.log(err)

        })

    }, [])
    return(

        <div>
            <h2>Account Component</h2>
            <table className = 'table table-striped table-hover table-dark table-bordered'>
                <thead>
                    <tr>    
                        <th>Email</th>
                        <th>User Name</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.createdAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )

}
export default Account