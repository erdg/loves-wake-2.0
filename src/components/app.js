import { h, Component } from 'preact';
import { Router } from 'preact-router';

import withAuth from './withAuth';

import Header from './header';
import Home from '../routes/home';
import Login from '../routes/Login';
import Signup from '../routes/signup';

import User from '../routes/user';
import UserSettings from '../routes/UserSettings';
import CreateShrine from '../routes/create-shrine';
import ManageMemorial from '../routes/ManageMemorial';

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

// routes requiring auth
const UserWithAuth = withAuth(User);
const CreateShrineWithAuth = withAuth(CreateShrine);
const ManageMemorialWithAuth = withAuth(ManageMemorial);

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
   
   logoutUser = () => {
      this.setState({ user: {} });
      window.sessionStorage.removeItem("loginToken");
   }

   render() {
      return (
         <div id="app">
            { /* NOTE - this will be different
               * will likely check localStorage for a login token,
               * or will be a flag confirming that the login token 
               * has be validated for this session */ }
            <Header 
               isLoggedIn={this.state.user.email ? true : false } 
               name={this.state.user.name || this.state.user.email} 
               img={this.state.user.img}
               logoutUser={this.logoutUser}
            />
            <Router onChange={this.handleRoute}>
               <Home path="/" />

               <Login path="/login" />
               <Signup path="/signup" />
               <CreateShrineWithAuth path="/create-shrine" 
                  setUserData={(user) => this.setUserData(user)}
                  user={this.state.user}
               />

               { /* public shrines */ }
               { /* ============== */ }
               { /* shrine landing page */ }
               <Entry path="/:urlStr/:urlNm" />
               <Shrine path="/:urlStr/:urlNm/shrine" />
               <Chronicle path="/:urlStr/:urlNm/chronicle" />
               <Atlas path="/:urlStr/:urlNm/atlas" />

               { /* user profiles */ }
               <UserWithAuth path="/user" 
                  setUserData={(user) => this.setUserData(user)}
                  user={this.state.user}
               />
               <UserSettings path="/user/settings" user={this.state.user}/>

               <ManageMemorialWithAuth 
                  path="/user/manage-memorial/:urlNm"
                  user={this.state.user}
                  setUserData={(user) => this.setUserData(user)}
               />

               { /*
               <UserSettings path="/user/:id/settings" />
               */ }
            </Router>
         </div>
      );
   }
}
