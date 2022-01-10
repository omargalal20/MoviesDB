import axios from 'axios';
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

const SignIn = () => {
    const [userData, setUserData] = useState({});
    const history = useHistory();

    const handleSubmit = () => {
        axios.post('http://localhost:8000/user/signup', userData).then((res) => {
            console.log(res.data)
            history.push('/home')
        })
    }

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Sign Up</Card.Header>
            <Card className = 'm-2 w-50 p-2'>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Name" 
                        onChange = {(e)=> {
                            setUserData({...userData, name: e.target.value})
                        }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        onChange = {(e)=> {
                            setUserData({...userData, username: e.target.value})
                        }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange = {(e)=> {
                            setUserData({...userData, Email: e.target.value})
                        }}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange = {(e)=> {
                            setUserData({...userData, password: e.target.value})
                        }}
                    />
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
            </Card>
        </Card>
        </>
    );
};

export default SignIn;