import { h, Component } from 'preact';
import marked from 'marked';

import { Dialog } from '../../../components/dialog';
import { TextInput } from '../../../components/form-inputs/';
import { NextStepButton } from '../next-step-button';
import { PrevStepButton } from '../prev-step-button';

class CreateShrineFormStep5 extends Component {
   constructor (props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   render () {
      return (
         <div>
            <h5>Customize Invitation</h5>
            <textarea
               style="resize:none;"
               class="form-input" 
               rows="16" 
               name="invitation"
               value={this.props.invitation} 
               onInput={this.props.onChange} 
            />
            <div class="relative">
               <div class="customizeInvitationDialog" >
               <h5>Preview</h5>
                  <div
                     dangerouslySetInnerHTML={{__html: marked(this.props.invitation)}}
                  />
               </div>
            </div>
            <div class="row my-2">
               <PrevStepButton
                  onClick={ this.props.handlePrevStep }
               />
               <NextStepButton 
                  onClick={ this.props.updInvitation }
               />
            </div>
         </div>
      );
   }
}

export { CreateShrineFormStep5 };  
