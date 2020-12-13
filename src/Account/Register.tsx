import React, { useState } from "react";
import './Register.css';
import { Button, Col, Container, Row } from 'reactstrap';

function Register(props) {

    console.log('Hello from register');

    const [state, setState] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        
    }) 

    const handleChange = (e) => {
        console.log('handling change');
        const {id, value} = e.target
        setState(prevstate => ({
            ...prevstate,
            [id]: value,
        }))
    }
    
    const handleRegisterClick = (e) => {
        console.log('Register handleclick');
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            register(state.username, state.password);
        } else {
            return null; // skal ændres
        }
    }

    return (
        <div className="register-container">
            <form>
                <div className="register-field">
                <label htmlFor="exampleInputUsername">Username</label>
                <input 
                type="username"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={state.username}
                />
                </div>

                <div className="register-field">
                <label htmlFor="exampleInputPassword">Password</label>
                <input 
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={state.password}
                />
                </div>

                <div className="register-field">
                <label htmlFor="exampleInputPassword">Confirm Password</label>
                <input 
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                value={state.confirmPassword}
                />
                </div>

                <Button
                color="primary"
                type="submit"
                className="submit-button"
                onClick={handleRegisterClick}>
                Register
                </Button>


            </form>

        </div>
    )
}

async function register(un: string, pw: string) {
    console.log('Starting registering');
    if (un !== "" && pw !== "") {
        return await fetch("https://webassignment3grp10api.herokuapp.com/authentication/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'//,
                      //'Authorization': 'Bearer token'
                    },
            body: JSON.stringify({username: un, password: pw})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
            })
            .then(data => {
                console.log('Success', data.token);
                localStorage.setItem('user', un);
                localStorage.setItem('jwt', data.token);
            })
        .catch(error => {
            console.log('Error', error);
        })
    }
    console.log('Register success');
}

export default Register