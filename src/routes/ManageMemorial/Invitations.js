import { h, Component } from 'preact';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';

import API_ENDPOINT from '../../api';
import InvitationModal from './InvitationModal';

import { Dialog } from '../../components/dialog';
import { TextInput } from '../../components/form-inputs/';


class Invitations extends Component {
   state = {
      email: '',
      emails: [],
      emailError: false,
      active: false,
      // email search string
      filter: '',
      showModal: false,
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   hideModal = () => {
      this.setState({ showModal: false });
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
      if (this.state.emails.length === 0) {
         alert("No new people to send inivations to, please add new email addresses.");
         return;
      }
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
         <div class="semi-transparent-bg">

            <div class="row my-2">
               <h4 class="col" style="width:80%">Invite Others to Contribute</h4>

               <button class="btn btn-primary col"
                  onClick={() => this.setState({ showModal: true })}
               > Edit Invitation
               </button>
            </div>

            <InvitationModal 
               memorial={this.props.memorial}
               showModal={this.state.showModal}
               hideModal={this.hideModal}
               updInvitation={(updated) => props.updInvitation(updated)}
            />

            { 
               this.props.memorial.emails ?
                  <div>
                     <span class="badge" 
                        data-badge={this.props.memorial.emails.length.toString()}
                     >Invitations Sent
                     </span>
                     <span>
                        { 
                           this.state.active ?
                              <div class="d-inline">
                                 <button class="btn btn-sm ml-2"
                                    onClick={() => this.setState({ active: false })}
                                 > hide
                                 </button>
                                 <div class="input-group float-right">
                                    <span class="input-group-addon addon-sm">
                                       <i class="icon icon-search" />
                                    </span>
                                    <input 
                                       class="form-input input-sm"
                                       type="text"
                                       value={this.state.filter}
                                       onInput={this.onChange}
                                       name="filter"
                                    />
                                 </div>
                              </div>
                                 :
                              <button class="btn btn-sm ml-2"
                                 onClick={() => this.setState({ active: true })}
                              > show
                              </button>
                        }
                     </span>
                     { this.state.active &&
                        <div class="my-2">
                           { this.state.filter !== "" ?
                                 this.props.memorial.emails
                                 .filter(email => email.includes(this.state.filter))
                                 .map((email) => (
                                    <span class="chip">{email}</span>
                                 ))
                                    :
                                 this.props.memorial.emails.map((email) => (
                                    <span class="chip">{email}</span>
                                 ))
                           }
                        </div>
                     }
                  </div>
                     :
                  <h5>You haven't invited anyone yet</h5>
            }

            <form class={ formClasses } >

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
               <button class="btn btn-primary float-right"
                  onClick={this.updEmails}
               > Send Invitations
               </button>
            </div>

         </div>
      );
   }
}

export default Invitations;
