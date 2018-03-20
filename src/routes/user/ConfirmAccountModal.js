import { h, Component } from 'preact';
import classnames from 'classnames';
import { TextInput } from '../../components/form-inputs';

class ConfirmAccountModal extends Component {
   state = {
      // 6-digit confirmation code
      code: ""
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   // returns true if code exists and is not a number or is not 6 digits
   codeHasError = () => {
      if (this.state.code && (isNaN(this.state.code) || !(this.state.code.length === 6))) {
         return true;
      }
   }

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-sm",
         { "active": props.showModal }, 
         { "has-error": this.codeHasError() }
      );

      let errorHint = classnames(
         "form-input-hint", "float-left", 
         // { "d-hide": !this.codeHasError() }
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

                  <div class="content">

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

               </div>


               <div class="modal-footer">

                  <button 
                     class="btn btn-primary"
                     onClick={props.confirmAccount}
                  >
                     Confirm
                  </button>

               </div>

            </div>

         </div>
      );
   }
}

export default ConfirmAccountModal;
