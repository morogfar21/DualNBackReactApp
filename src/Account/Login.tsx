import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';
import TextField from '@material-ui/core/Textfield';
import './Login.css'

interface ILoginProps extends RouteComponentProps {
    
}

export const Login: React.FC<ILoginProps> = (props) => {

    console.log('Entered login page');
    // e: MouseEvent<HTMLInputElement>;
    const [state, setState] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        console.log('handling change login');
        const { id, value } = e.target
        setState(prevstate => ({
            ...prevstate,
            [id]: value
        }))
    }

    const handleLoginClick = (e) => {
        console.log('handling loginclick');
        e.preventDefault();
        login(state.username, state.password);
    }

    return (

        <div className="login-container">
            <form>
                <div className="login-field">
                    <label htmlFor="exampleInputUsername">Username</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>

                <Button
                    color="primary"
                    type="submit"
                    className="submit-button"
                    onClick={handleLoginClick}>
                    Login
                </Button>


            </form>

        </div>
    )

    function login(un: string, pw: string) {
        console.log('Starting login');
        if (un !== "" && pw !== "") {
            return fetch("https://webassignment3grp10api.herokuapp.com/authentication/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: un, password: pw })
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
                    props.history.push('/homepage');
                    window.location.reload(false);
                })
                .catch(error => {
                    console.log('Error', error);
                })
        }
        console.log('Login succeeded');
    }
}



export default Login;