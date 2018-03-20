import { h, Component } from 'preact';

import { FlexContainer } from '../../components/FlexContainer';
import { LoginFormContainer } from './login-form-container';

class Login extends Component {
   render (props) {
      return (
         <FlexContainer
            formRail={
               <LoginFormContainer
                  handleLoginSuccess={ (user, token) => props.handleLoginSuccess(user, token) }
                  handleRecoverAccountSuccess={ (email) => props.handleRecoverAccountSuccess(email) }
               />
            }
         />
      );
   }
}

export default Login;

