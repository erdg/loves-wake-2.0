import { h, Component } from 'preact';

import { Dialog } from '../../../components/dialog';
import { TextInput, Radio, Label } from '../../../components/form-inputs/';

const StillWithUs = (props) => (
   <div>

      {/*
      <Dialog active="false">
      </Dialog>
      */}

      <Label>Is { props.firstName } still with us?</Label>
      <div onChange={ props.handleDeath } class="col mx-2">
         <div class="row">
            <Radio 
               label="Still alive and well" 
               name="deceased"
               value="false"
            />
         </div>
         <div class="row">
            <Radio 
               label="Will pass soon" 
               name="deceased"
               value="false"
            />
         </div>
         <div class="row">
            <Radio 
               label="Passed away" 
               name="deceased"
               value="true"
            />
         </div>
      </div>

   </div>
)

export { StillWithUs };
