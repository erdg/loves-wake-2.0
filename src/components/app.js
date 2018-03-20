import { h, Component } from 'preact';
import { Router } from 'preact-router';

import withAuth from './withAuth';

import Header from './header';
import Home from '../routes/home';
import Login from '../routes/Login';
import Signup from '../routes/signup';
import User from '../routes/user';
import CreateShrine from '../routes/create-shrine';

// public shrines
import Entry from '../routes/Entry';
import Shrine from '../routes/Shrine';
import Atlas from '../routes/Atlas';
import Chronicle from '../routes/Chronicle';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
   require('preact/debug');
}

const UserWithAuth = withAuth(User);

export default class App extends Component {
   state = {
      user: {}
   }
   /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
   handleRoute = e => {
      this.currentUrl = e.url;
   };

   setUserData = (user) => {
      this.setState({ user: user });
   }

   render() {
      return (
         <div id="app">
            { /* NOTE - this will be different
               * will likely check localStorage for a login token,
               * or will be a flag confirming that the login token 
               * has be validated for this session */ }
            <Header isLoggedIn={this.state.user.email ? true : false } name={this.state.user.name || this.state.user.email} />
            <Router onChange={this.handleRoute}>
               <Home path="/" />

               <Login path="/login" />
               <Signup path="/signup" />
               <CreateShrine path="/create-shrine" />

               { /* public shrines */ }
               { /* ============== */ }
               { /* shrine landing page */ }
               <Entry path="/:name" />
               <Shrine path="/:name/shrine" />
               <Chronicle path="/:name/chronicle" />
               <Atlas path="/:name/atlas" />

               { /* user profiles */ }
               <UserWithAuth path="/user" 
                  setUserData={(user) => this.setUserData(user)}
                  user={this.state.user}
               />

               { /*
               <UserSettings path="/user/:id/settings" />
               */ }
            </Router>
         </div>
      );
   }
}
