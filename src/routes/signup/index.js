import { h, Component } from 'preact';

import { FlexContainer } from '../../components/FlexContainer';
import { SignupFormContainer } from './signup-form-container';

class Signup extends Component {
   render (props) {
      return (
         <FlexContainer 
            formRail={ 
               <SignupFormContainer 
                  handleSignupSuccess={ (email) => props.handleSignupSuccess(email) }
               /> 
            } 
         />
      );
   }
}

export default Signup;

