import axios from 'axios';
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"
import FlashMessage from 'react-flash-message'

const Login = props => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        setMessage('Signing You In ...')
        setShowMessage(true)
        axios.post('http://localhost:8000/user/login', {
            username: username,
            password: password
        }).then((res) => {
            if (Object.keys(res.data).length === 0) {
                setMessage('Wrong Username or Password')
                props.setLoggedIn(false);
            }
            else{
                props.setLoggedIn(true);
                props.setUser(res.data);
                console.log(res.data)
                history.push('/home')
            }
        })
    }

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Log In</Card.Header>
            <Card className = 'm-2 w-50 p-2'>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter Username" 
                        onChange = {(e)=> {
                            setUsername(e.target.value)
                        }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange = {(e)=> {
                            setPassword(e.target.value)
                        }}
                    />
                  </Form.Group>
                  <div style={{ height: '3vh' }}>
                    {
                        (showMessage) && (
                            <FlashMessage duration={5000}>
                                <strong>{message}</strong>
                            </FlashMessage>
                        )
                    }
                    </div>
                  <Button variant="primary" type="button" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
            </Card>
        </Card>
        </>
    );
};

export default Login;