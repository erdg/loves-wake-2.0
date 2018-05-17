import { h, Component } from 'preact';
import marked from 'marked';
import classnames from 'classnames';
import { TextArea, TextInput, DateInput } from '../../components/form-inputs';
import API_ENDPOINT from '../../api';

// add a new item to chronicle
class InvitationModal extends Component {
   constructor(props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
      this.state = {
         invitation: this.props.memorial.invitation || ''
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-lg", { "active": props.showModal }, { "has-error": props.modalError}
      );

      let errorHint = classnames(
         "form-input-hint", "float-left", { "d-hide": !props.modalError }
      );

      var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;

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
                     Edit Invitation to {props.memorial.nm1}'s Memorial
                  </div>


                  { width < 840 &&
                     <div class="text-center text-gray" style="font-size:smaller;">
                        - Scroll down to see a preview -
                     </div>
                  }

               </div>

               <div class="modal-body">
                  <div class={width < 840 ? "content" : "content container columns"}>

                     <form class={width < 840 ? "form-group" : "form-group column col-5"}>
                        <textarea class="form-input" rows="16"
                           value={this.state.invitation}
                           onInput={this.onChange}
                           name="invitation"
                        />

                     </form>

                     <div class={width < 840 ? "card" : "card column col-7"}>
                        <div class="card-body"
                           dangerouslySetInnerHTML={{__html: marked(this.state.invitation)}}
                        />
                     </div>

                  </div>

               </div>


               <div class="modal-footer">

               </div>

            </div>

         </div>
      );
   }
}

export default InvitationModal;
