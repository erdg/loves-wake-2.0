import { h, Component } from 'preact';
import { DateInput } from '../../../components/form-inputs';
import { Dialog } from '../../../components/dialog';

const DateOfBirth = (props) => (

   <div>

      <DateInput
         label="Date of Birth"
         name="born"
         value={props.born}
         onChange={props.onChange}

      />

   </div>

)

export { DateOfBirth };


