import { h, Component } from 'preact';

const PrevStepButton = (props) => (
   <button
      class="btn btn-link"
      onClick={ props.onClick }
   >
      prev
   </button>
)

export { PrevStepButton };
