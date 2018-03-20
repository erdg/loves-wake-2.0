import { h, Component } from 'preact';

import { Dialog } from '../../../components/dialog';
import { TextInput, Radio, Label } from '../../../components/form-inputs/';

const ChooseGender = (props) => (
   <div>

      <Dialog active="true">
         <div class="card">
            <div class="card-body">
               <strong>We'll use this answer for the email template in the next section.</strong>
               <div>
                  <p>Think about { props.firstName }.</p>
                  { props.subjPronoun ?
                     <p>How did { props.subjPronoun }... What was { props.posPronoun } favorite...</p>
                     :
                     <p>How did... </p>
                  }
               </div>
            </div>
         </div>
      </Dialog>

      <Label>Gender & Pronoun</Label>
      <div onChange={ props.handleGenderChange } class="col mx-2">

         <div class="row">
            <Radio 
               label="Female" 
               value="Female"
               name="gender" 
            />
            <span class="text-gray">- She/Her</span>
         </div>

         <div class="row">
            <Radio 
               label="Male" 
               value="Male"
               name="gender" 
            />
            <span class="text-gray">- He/Him</span>
         </div>

         {/*
         <div class="row">
            <Radio label="Other" name="gender" />
         </div>
         */}

      </div>

   </div>
)

export { ChooseGender };
