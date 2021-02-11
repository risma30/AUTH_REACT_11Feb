import React from 'react'
import axios from 'axios'
import Login from './login'
import {Link} from 'react-router-dom'
import {Card, Form, Button, Container} from 'react-bootstrap'

class Register extends React.Component {
    constructor () {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }
    Register = event => {
        const base_url = "http://localhost:2000"
        event.preventDefault()
        let sendData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        let url = base_url + "/register"
        
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let user = response.data.data
                let token = response.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/login")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => alert(error))
    }
    render () {
        return(
            <Container className="container d-flex justify-content-center align-items-center">
                <Card className="col-sm-6 card my-5">
                <Card.Header className="card-header bg-primary text-white text-center">Register</Card.Header>
                <Card.Body>
                    { !this.state.logged ? 
                        (
                            <div className="alert alert-success mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                    <Form onSubmit={ev => this.Register(ev)}>
                    <Card.Text>
                    <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" value={this.state.email}
                            onChange={ev => this.setState({email: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">Submit</Button>
                    <h7>Already have account? </h7><Link to='/login'><h7>Login</h7></Link>
                    </Form>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Register