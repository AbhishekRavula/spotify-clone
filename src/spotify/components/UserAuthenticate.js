import React, { useState } from 'react'
import '../styles/Welcome.css'
import Button from '@material-ui/core/Button';
import { HOSTNAME } from '../spotify.constants.js'


function UserAuthenticate() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState(null)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${localStorage.getItem('token')}`},
        body: JSON.stringify({
            username: username,
            password: password
        })
    }


    function login() {

        fetch(HOSTNAME + 'token/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.non_field_errors) {
                    alert(
                        "Invalid credentials, please retry,\nIf you are a new user, please register"
                    )
                }
                else if (json.token) {
                    localStorage.setItem("token", json.token)
                    localStorage.setItem("username", json.username)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const register = () => {
        delete requestOptions.headers.Authorization;

        fetch(HOSTNAME + 'users/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json === "A user with that username already exists.") {
                    alert(json)
                }
                else {
                    localStorage.setItem("token", json.token)
                    localStorage.setItem("username", json.username)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div id="userAuthenticate">
            <div className='mb-2'>
                <strong className='text-white'>To Continue, Please Login or Register to Musify</strong><br />
            </div>
            <label className='text-white mb-2'>Username</label><br />
            <input type='text' name='username' onChange={e => setusername(e.target.value)} /><br />
            <label className='text-white mb-2'>Password</label><br />
            <input type='password' name='password' onChange={e => setpassword(e.target.value)} /><br />
            <div style={{ display: 'flex', justifyContent: "space-between" }} className='mt-2'>
                <Button variant="contained" size="small"  onClick={login}>login</Button>
                <Button variant="contained" size="small" onClick={register}>Register</Button>
            </div>
        </div>
    )
}

export function Logout() {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href='/'
    }

    return (
        <Button variant="contained" size="small" onClick={logout} >logout</Button>
    )
}

export default UserAuthenticate
