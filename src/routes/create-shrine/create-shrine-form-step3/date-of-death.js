import { h, Component } from 'preact';
import classNames from 'classnames';
import { DateInput } from '../../../components/form-inputs';
import { Dialog } from '../../../components/dialog';

const DateOfDeath = (props) => {

   let classes = classNames({ 'd-none': !props.deceased });

   return (
      <div class={ classes } >

         <DateInput
            label="Date of Death"
            name="died"
            value={props.died}
            onChange={props.onChange}
         />

      </div>
   )
}

export { DateOfDeath };


