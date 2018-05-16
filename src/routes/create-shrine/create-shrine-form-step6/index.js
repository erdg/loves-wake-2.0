import { h, Component } from 'preact';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';

import API_ENDPOINT from '../../../api';

import { Dialog } from '../../../components/dialog';
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

   _addEmail = (e) => {
      e.preventDefault();
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

   // update invitation list for memorial
   updEmails = () => {
      fetch(API_ENDPOINT + "!updEmails", {
         method: "POST",
         body: JSON.stringify({
            emails: this.state.emails,
            memorial: this.props.memorial.urlNm,
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      })
      .then(res => res.json())
      .then(json => {
         console.log(json);
      })
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

            <h5>Invite Others to Contribute</h5>
            <form class={ formClasses } >

               <Dialog active >
                  We'll send emails on your behalf to invite others to
                  contribute to {props.firstName ? props.firstName + "'s" : "this"} memorial.
                  Unfortunately you will have to manually enter emails for
                  the time being. In the near future we'll be able to sync
                  with your Apple/Google contacts. Apologies for the inconvenience.
               </Dialog>
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
                     type="submit"
                     onClick={ this._addEmail }
                  >
                     Add
                  </button>

               </div>

               <p class={ emailHintClasses }>
                  Please enter a valid email address
               </p>

            </form>

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
               <button class="btn btn-primary float-right"
                  onClick={this.updEmails}
               > Send Invitations
               </button>
            </div>

         </div>
      );
   }
}

export { CreateShrineFormStep6 };  
