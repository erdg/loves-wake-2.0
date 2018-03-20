const NextStepButton = (props) => {
   return (
      <button
         class="btn btn-primary float-right"
         onClick={ props.onClick }
      >
         Next Step
      </button>
   );
}

export { NextStepButton };
