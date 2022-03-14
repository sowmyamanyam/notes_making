import React from 'react'

import { Link, Route, withRouter } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import NotesContainer from './NotesContainer'
import swal from 'sweetalert'

const NavBar = (props) => {

    const { isLoggedIn, handleAuth } = props

    return(
    <div>
        <h2>Welcome to Personal Notes Writing App...</h2>
         <ul>
            <li><Link to = "/">Home</Link></li>
                {isLoggedIn ? (<div>
                <li><Link to = '/account'>Account</Link></li>
                <li><Link to = '/notes'>My Notes</Link></li>
                <li><Link to = "/" onClick = {() => {

                    const confirmLogout = window.confirm('Are you sure to logout..?')

                    if(confirmLogout){

                        localStorage.removeItem('token')
                        swal('Cool..!', 'Good Bye', 'success')
                        handleAuth()
                        props.history.push('/')

                    }

                }}>Logout</Link></li>

                </div>) : (<div>
                <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/register'>Register</Link></li> 
                </div>)}
                </ul>
            <Route path = "/" component = {Home} exact = {true}/>
            <Route path = "/login" render = {(props) => {

                return <Login {...props} handleAuth = {handleAuth}/>

            }}/>
            <Route path = "/register" component = {Register} />
            <Route path = '/account' component = {Account} />
            <Route path = '/notes' component = {NotesContainer} />
    </div>

    )


}
export default withRouter(NavBar)