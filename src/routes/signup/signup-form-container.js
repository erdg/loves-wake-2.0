import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import { route } from 'preact-router';
import isEmail from 'validator/lib/isEmail';

import { SignupForm } from './signup-form';

class SignupFormContainer extends Component { 
   state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      showPassword: false,
      serverError: '',
      showServerError: false,
      loading: false,
      signupSuccess: false
   }

   _toggleShowPassword = () => {
      let showPassword = !this.state.showPassword;
      this.setState({ showPassword });
   }

   _handleSignup = () => {
      // if not valid email address
      if ( !(isEmail(this.state.email)) ) {
         // throw email error, don't submit
         this.setState({ emailError: true });
         return
      } else {
         this.setState({ emailError: false });
      }

      // make sure there's a password
      if (!this.state.password) {
         this.setState({ passwordError: true });
         return
      } else { 
         this.setState({ passwordError: false }); 
      }


      this.setState({ loading: true });

      fetch(API_ENDPOINT + '!newUser', {
         method: "POST",
         body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
         })
      })
      .then(res => res.json())
      .then(json => {
         if (json.error) {
            this.setState({ 
               // display errors and remove loading spinner
               serverError: json.error, 
               showServerError: true,
               loading: false
            });
         } else {
            this.setState({ loading: false });
            console.log('JWT: ', json.loginToken);
            window.sessionStorage.setItem("loginToken", json.loginToken);
            route("/user");
         }
      });
   }

   _handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
   }

   _handlePasswordChange = (e) => {
      this.setState({ password: e.target.value });
   }

   componentWillUnmount () {
      this.setState({ email: '', password: '' });
   }

   render () {
      return (
         <SignupForm 

            serverError={ this.state.serverError }
            showServerError={ this.state.showServerError }

            email={ this.state.email }
            emailError={ this.state.emailError }
            handleEmailChange={ this._handleEmailChange }

            password={ this.state.password }
            passwordError={ this.state.passwordError }
            handlePasswordChange={ this._handlePasswordChange }

            toggleShowPassword={ this._toggleShowPassword }
            showPassword={ this.state.showPassword }

            handleSignup={ this._handleSignup }

            loading={ this.state.loading }

         />
      )
   }
}

export { SignupFormContainer };
