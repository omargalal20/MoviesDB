import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios'

const NavBar = props => {
    const history = useHistory();
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    }

    const handleSubmit = () => {
        console.log(search)
        axios.post('http://localhost:8000/movies/search',{
            string: search
        }).then((res) => {
            console.log(res.data)
            history.push('/search', {searched: [...res.data.films]})
        });
    }

    return(
        <Navbar bg="dark" variant="dark" className='d-flex justify-content-between' style={{ height: '120px' }}>
        <Container>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto ml-5"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link onClick = {() => history.push('/home')}>Home</Nav.Link>
                { 
                  (Object.keys(props.user).length !== 0)
                    &&
                  (
                    <>
                    <Nav.Link onClick = {() => history.push('/likes')}>Likes</Nav.Link>
                    <Nav.Link onClick = {() => history.push('/watchlist')}>Watch List</Nav.Link>
                    </>
                  )
                }
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-3"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <Button variant="outline-success" onClick={handleSubmit}>Search</Button>
              </Form>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
            <Nav
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              { 
                (Object.keys(props.user).length !== 0)
                  ?
                  (
                    <div className = 'd-flex flex-column justify-content-center align-items-center'>
                    <Navbar.Text>
                      Signed in as: {props.user.username}
                    </Navbar.Text>
                    <Nav.Link onClick = {() => {
                      props.setUser({})
                      props.setLoggedIn(false)
                      history.push('/home')
                    }}>
                      Log Out
                    </Nav.Link>
                    </div>
                  )
                  :
                  (
                    <>
                    <Nav.Link onClick = {() => history.push('/signup')}>Sign Up</Nav.Link>
                    <Nav.Link onClick = {() => history.push('/login')}>Log In</Nav.Link>
                    </>
                  )
              }
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;