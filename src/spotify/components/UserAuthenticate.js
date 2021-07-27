import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import '../styles/Welcome.css'
import Button from '@material-ui/core/Button';
import { HOSTNAME } from '../spotify.constants.js'


function UserAuthenticate() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState(null)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token f56de93c012b18a4b85e65f41bef2f235fd2dbab' },
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

        fetch( HOSTNAME + 'users/', requestOptions)
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
            <strong>To Continue, Please Login or Register to SpotifyClone</strong><br />
            <label>Username</label><br />
            <input type='text' name='username' onChange={e => setusername(e.target.value)} /><br />
            <label>Password</label><br />
            <input type='password' name='password' onChange={e => setpassword(e.target.value)} /><br />
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <Button variant="contained" size="small" onClick={login}>login</Button>
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
