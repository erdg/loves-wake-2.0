import { Component } from 'preact';
import classNames from 'classnames';

import { EmailInput, PasswordInput } from './login-form-inputs';
import { Dialog } from '../../components/dialog';
import Toast from '../../components/toast';

class LoginForm extends Component {

   render (props) {

      let formClasses = classNames(
         'form-group', { 'has-error': props.emailError || props.passwordError }
      );

      let loginBtnClasses = classNames(
         'btn', 'btn-primary', { 'loading': props.loginBtnLoading }
      );

      let recoverBtnClasses = classNames(
         'btn', 'btn-link', 'float-right', { 'loading': props.recoverBtnLoading }
      );

      let emailHintClasses = classNames(
         'form-input-hint', { 'd-hide': !props.emailError }
      );

      let passwordHintClasses = classNames(
         'form-input-hint', { 'd-hide': !props.passwordError }
      );

      return (
         <form class={ formClasses }>

            <h1>Login</h1>

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
               Gotta have a password to login...
            </p>

            <div class="row">
               <button 
                  type="submit"
                  class={ loginBtnClasses }
                  onClick={ props.handleLogin }
               >
                  Login
               </button>
               <button 
                  class={ recoverBtnClasses }
                  onClick={ props.handleRecoverAccount }
               >
                  Recover account
               </button>

            </div>

         </form>
      )
   }
}

export { LoginForm };
