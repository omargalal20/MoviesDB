import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Navbar';
import HomePage from './HomePage/homepage';
import { Switch, Route, Redirect } from 'react-router-dom';
import WatchListPage from './WatchList/WatchList';
import LikesPage from './Likes/Likes';
import SearchPage from './Search/search';
import SignIn from './Signup/Signup';
import Login from './LogIn/Login';
import { useState } from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <>
    <NavBar user = {user} setUser={setUser} setLoggedIn={setLoggedIn}/>
    {
      loggedIn === false 
        ?
        (
          <Switch>
          <Route exact path='/home'>
            <HomePage user = {{...user}}/>
          </Route>
          <Route exact path='/search'>
            <SearchPage/>
          </Route>
          <Route exact path='/signup'>
            <SignIn/>
          </Route>
          <Route exact path='/login'>
            <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path='/'>
            <Redirect to="/home" />
          </Route>
        </Switch>
        )
        :
        (
          <Switch>
          <Route exact path='/home'>
            <HomePage user = {{...user}}/>
          </Route>
          <Route exact path='/watchlist'>
            <WatchListPage user = {{...user}}/>
          </Route>
          <Route exact path='/likes'>
            <LikesPage user = {{...user}}/>
          </Route>
          <Route exact path='/search'>
            <SearchPage user = {{...user}}/>
          </Route>
          <Route exact path='/signup'>
            <SignIn/>
          </Route>
          <Route exact path='/login'>
            <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path='/'>
            <Redirect to="/login" />
          </Route>
         </Switch>
        )
    }
    </>
  );
}

export default App;
