import { h, Component } from 'preact';

import { FileInput } from '../../../components/form-inputs/';
import { NextStepButton } from '../next-step-button';
import { PrevStepButton } from '../prev-step-button';

const CreateShrineFormStep2 = (props) => {
   return (
      <div>
         <FileInput 
            class="text-ellipsis"
            label="Upload a Photo" 
            onChange={props.onFileChange}
         />
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

export { CreateShrineFormStep2 }; 
