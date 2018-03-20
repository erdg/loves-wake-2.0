import { h, Component } from 'preact';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';

import { TextInput } from '../../../components/form-inputs/';
import { PrevStepButton } from '../prev-step-button';


class CreateShrineFormStep6 extends Component {
   state = {
      email: '',
      emails: [],
      emailError: false
   }

   _handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
   }

   _addEmail = () => {
      // if not valid email address
      if ( !(isEmail(this.state.email)) ) {
         // throw email error, don't submit
         this.setState({ emailError: true });
         return
      } else {
         this.setState({ emailError: false });
      }

      this.setState({ 
         emails: [ ...this.state.emails, this.state.email ],
         email: ''
      });
   }

   _removeEmail = (e) => {
      // save all emails except the one we want to get rid of...
      // NOTE - originally intended to use e.target.value, but that isn't
      // a thing when clicking on <a> tags. went with e.target.name as
      // that was something I could set when the element is created.
      // see line 67 below.
      let emails = this.state.emails.filter( email => email !== e.target.name );
      // and set the state to that.
      this.setState({ emails: emails });
   }

   render (props, state) {

      let formClasses = classNames(
         'form-group', { 'has-error': this.state.emailError }
      );

      let emailHintClasses = classNames(
         'form-input-hint', { 'd-hide': !this.state.emailError }
      );

      return (
         <div>

            <div class={ formClasses } >

               <label class="form-label">Enter email addresses</label>

               <div class="input-group">

                  <input 
                     type="email" 
                     class="form-input" 
                     value={ this.state.email }
                     onChange={ this._handleEmailChange }
                  />

                  <button 
                     class="btn btn-primary input-group-btn"
                     onClick={ this._addEmail }
                  >
                     Add
                  </button>

               </div>

               <p class={ emailHintClasses }>
                  Please enter a valid email address
               </p>

            </div>

            <div class="mt-2" >
               { this.state.emails.map((email) => (
                  <span 
                     class="chip"
                  >
                     { email }
                     <a 
                        class="btn btn-clear" 
                        aria-label="Close" 
                        role="button" 
                        onClick={ this._removeEmail }
                        name={ email }
                     />
                  </span>
               )) }
            </div>

            <div class="row my-2">
               <PrevStepButton
                  onClick={ props.handlePrevStep }
               />
            </div>

         </div>
      );
   }
}

export { CreateShrineFormStep6 };  
