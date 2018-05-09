import { h, Component } from 'preact';
import marked from 'marked';

import { TextInput, Radio } from '../../../components/form-inputs/';
import { NextStepButton } from '../next-step-button';
import { PrevStepButton } from '../prev-step-button';

class CreateShrineFormStep4 extends Component {
   constructor (props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
   }

   state = {
      invitation: '',
   }

   onChange = (e) => {
      this.setState({ invitation: e.target.value });
   }

   render () {
      var mourn = `This is the *Mourn Together* Template`;
      var heal = `This is the *Heal Together* Template`;
      var remember = `This is the *Remember Together* Template`;
      return (
         <div>
            <div class="relative">
               <div class={this.state.invitation ? "dialog" : "d-hide"}>
               <h5>Preview</h5>
                  <div
                     dangerouslySetInnerHTML={{__html: marked(this.state.invitation)}}
                  />
               </div>
            </div>
            <h5>Choose an Invitation Template</h5>
            <div onChange={this.onChange} class="col mx-2">
               <div class="row">
                  <Radio 
                     label="Mourn Together" 
                     name="invitation"
                     value={mourn}
                  />
                  <div style="margin-left:25px;font-size:smaller;">
                     <div class="text-gray">- For a recent loss</div>
                     <div class="text-gray">- Encourages people to process grief</div>
                  </div>
               </div>
               <div class="row">
                  <Radio 
                     label="Heal Together" 
                     name="invitation"
                     value={heal}
                  />
                  <div style="margin-left:25px;font-size:smaller;">
                     <div class="text-gray">- For after a loss stops hurting</div>
                     <div class="text-gray">- Encourages people to reconsider loss</div>
                  </div>
               </div>
               <div class="row">
                  <Radio 
                     label="Remember Together" 
                     name="invitation"
                     value={remember}
                  />
                  <div style="margin-left:25px;font-size:smaller;">
                     <div class="text-gray">- For a loss that feels distant now</div>
                     <div class="text-gray">- Encourages people to remember</div>
                  </div>
               </div>
            </div>
            <div class="row my-2">
               <PrevStepButton
                  onClick={ this.props.handlePrevStep }
               />
               <NextStepButton 
                  onClick={() => {
                     this.props.setInvitation(this.state.invitation);
                     this.props.handleNextStep();
                  }}
               />
            </div>

         </div>
      );
   }
}

export { CreateShrineFormStep4 };  
