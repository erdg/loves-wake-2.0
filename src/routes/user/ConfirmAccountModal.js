import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import classnames from 'classnames';
import { TextInput } from '../../components/form-inputs';
import Toast from '../../components/toast';

class ConfirmAccountModal extends Component {
   state = {
      // 6-digit confirmation code
      code: '',
      codeHasError: false,
      serverError: '',
      showServerError: false,
      confirmAccountSuccess: false,
      loading: false
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      this.codeHasError();
   }

   // returns true if code exists and is not a number or is not 6 digits
   codeHasError = () => {
      if (!this.state.code || (isNaN(this.state.code) || !(this.state.code.length === 6))) {
         this.setState({ codeHasError: true });
         return true;
      } else {
         this.setState({ codeHasError: false });
         return false;
      }
   }

   confirmAccount = () => {
      if (this.codeHasError()) {
         return;
      }
      this.setState({ loading: true });
      fetch(API_ENDPOINT + '!confirmUser', {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            code: this.state.code
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
         } else if (json.loginToken) {
            // remove loading spinner
            this.setState({ loading: false, confirmAccountSuccess: true });
            window.sessionStorage.setItem('loginToken', json.loginToken);
         }
      })
   }

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-sm",
         { "active": props.showModal }, 
         { "has-error": this.state.codeHasError }
      );

      let errorHint = classnames(
         "form-input-hint",
         "float-left",
         { "d-hide": !this.codeHasError }
      );

      return (
         <div class={modalClasses}>

            <a onClick={props.hideModal} 
               class="modal-overlay" 
               aria-label="Close" 
            />

            <div class="modal-container">

               <div class="modal-header">
                  <a onClick={props.hideModal} 
                     class="btn btn-clear float-right" 
                     aria-label="Close"
                  />
                  <div class="modal-title h5">
                     Confirm Account
                  </div>
               </div>

               <div class="modal-body">
                  { this.state.confirmAccountSuccess ?
                     <div>
                        <div class="toast toast-success">
                           You're all set
                        </div>
                     </div>
                        :
                     <div class="content">
                        { this.state.showServerError &&
                           <div class="toast toast-error">
                              {this.state.serverError}
                           </div>
                        }
                        <p>We sent you an email with a 6-digit code. Please enter
                           the code below to confirm your account.
                        </p>
                        <form class="form-group">
                           <p class={errorHint}>
                              Enter a 6-digit number
                           </p>
                           <TextInput 
                              onChange={this.onChange}
                              name="code"
                              value={this.state.code}
                              placeholder="e.g. 123456" 
                           />
                        </form>
                     </div>
                  }
               </div>

               <div class="modal-footer">
                  { this.state.confirmAccountSuccess ?
                     <button 
                        class="btn btn-primary"
                        onClick={() => { props.hideModal; window.location.reload(true); }}
                     >Close
                     </button>
                           :
                     <button 
                        class={classnames("btn", "btn-primary", {loading: this.state.loading})}
                        onClick={this.confirmAccount}
                     > Confirm
                     </button>
                  }
               </div>

            </div>
         </div>
      );
   }
}

export default ConfirmAccountModal;
