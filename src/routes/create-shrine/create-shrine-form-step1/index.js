import { h, Component } from 'preact';
import classNames from 'classnames';

import { TextInput } from '../../../components/form-inputs/';
import { NextStepButton } from '../next-step-button';

class CreateShrineFormStep1 extends Component {
   state = {
      firstNameError: false,
      lastNameError: false
   }

   _handleNextStep = () => {
      if (!(this.props.firstName === '')) {
         this.setState({ firstNameError: false});
      } else {
         this.setState({ firstNameError: true });
      } 
      
      if (!(this.props.lastName === '')) {
         this.setState({ lastNameError: false});
      } else {
         this.setState({ lastNameError: true });
      } 
      
      if (this.state.firstNameError || this.state.lastNameError) {
         return
      }

      this.props.handleNextStep();
   }


   render (props, state) {

      let formClasses = classNames(
         'form-group', { 'has-error': this.state.firstNameError || this.state.lastNameError }
      );

      let firstNameHintClasses = classNames(
         'form-input-hint', { 'd-hide': !this.state.firstNameError }
      );

      let lastNameHintClasses = classNames(
         'form-input-hint', { 'd-hide': !this.state.lastNameError }
      );

      return (

         <div class={ formClasses }>

            <TextInput 
               label="First Name" 
               firstName={ props.firstName }
               name="firstName"
               value={props.firstName}
               onChange={ props.onChange }
            />

            <p class={ firstNameHintClasses }>
               Please enter a first name
            </p>

            <TextInput 
               label="Last Name" 
               lastName={ props.lastName }
               name="lastName"
               value={props.lastName}
               onChange={ props.onChange }
            />

            <p class={ lastNameHintClasses }>
               Please enter a last name
            </p>

            <div class="row my-2">

               <NextStepButton 
                  onClick={ this._handleNextStep }
               />

            </div>

         </div>
      );
   }
}

export { CreateShrineFormStep1 };  
