import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import '../styles/Welcome.css'
import Button from '@material-ui/core/Button';
import reactDom from 'react-dom';
// import IsLoggedIn from './index'


function UserAuthenticate(props) {

    console.log("user Authenticate called")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState(null)
    const history = useHistory()
    const token = localStorage.getItem('token')

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token f56de93c012b18a4b85e65f41bef2f235fd2dbab' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }


    function login() {

        console.log(username, password)

        fetch('http://localhost:8000/token/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log('login', json)
                console.log(json.non_field_errors)
                if (json.non_field_errors) {
                    alert(
                        "Invalid credentials, please retry,\nIf you are a new user, please register"
                    )
                }
                else if (json.token) {
                    console.log('logged in', json.token)
                    console.log('logg')
                    localStorage.setItem("token", json.token)
                    localStorage.setItem("username", json.username)
                    // props.setUserToken(localStorage.getItem('token'), localStorage.getItem('username'))
                    console.log("aipoindhi");
                    // history.push('/')
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const register = () => {

        fetch('http://localhost:8000/users/', requestOptions)
            .then(response => {
                console.log('response', response)
                return response.json()
            })
            .then(json => {
                console.log('register', json)
                if (json === "A user with that username already exists.") {
                    alert(json)
                }
                else {
                    props.setUserToken(json)
                    history.push('/')
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

export function Logout(props) {

    const history = useHistory()

    const logout = () => {
        console.log("logout called")
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href='/'
        // props.setUserToken(null)
        // history.push('/login')
    }

    return (
        <Button variant="contained" size="small" onClick={logout} >logout</Button>
    )
}

export default UserAuthenticate
