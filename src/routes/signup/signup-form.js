import { Component } from 'preact';
import classNames from 'classnames';

import { EmailInput, PasswordInput } from './signup-form-inputs';
import { Dialog } from '../../components/dialog';
import Toast from '../../components/toast';

class SignupForm extends Component {
   render (props) {
      let formClasses = classNames(
         'form-group', { 'has-error': props.emailError || props.passwordError }
      );

      let btnClasses = classNames( 
         'btn', 'btn-primary', { 'loading': props.loading }
      );

      let emailHintClasses = classNames(
         'form-input-hint', { 'd-hide': !props.emailError }
      );

      let passwordHintClasses = classNames(
         'form-input-hint', { 'd-hide': !props.passwordError }
      );


      return (
         <div class={ formClasses }>

            <h1>Signup</h1>

            <Toast error active={props.showServerError}>
               {props.serverError}
            </Toast>

            <EmailInput 
               email={props.email}
               handleEmailChange={props.handleEmailChange}
            />

            <p class={ emailHintClasses }>
               Please enter a valid email address
            </p>

            <PasswordInput 
               password={props.password}
               handlePasswordChange={props.handlePasswordChange}
               toggleShowPassword={ props.toggleShowPassword }
               showPassword={ props.showPassword }
            />

            <p class={ passwordHintClasses }>
               Every account needs a password...
            </p>

            <button 
               class={ btnClasses }
               onClick={ props.handleSignup }
            >
               Create account
            </button>

         </div>
      )
   }
}

export { SignupForm };
