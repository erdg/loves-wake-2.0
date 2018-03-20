import { h, Component } from 'preact';

import { TextInput } from '../../../components/form-inputs/';
import { NextStepButton } from '../next-step-button';
import { PrevStepButton } from '../prev-step-button';

const CreateShrineFormStep5 = (props) => {
   return (
      <div>
         <div class="row my-2">
            <PrevStepButton
               onClick={ props.handlePrevStep }
            />
            <NextStepButton 
               onClick={ props.handleNextStep }
            />
         </div>
      </div>
   );
}

export { CreateShrineFormStep5 };  
