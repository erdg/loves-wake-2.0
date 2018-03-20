import classNames from 'classnames';

const Dialog = (props) => {

   let diaClasses = classNames(
      'dialog', { 'd-none': !props.active }
   );

   let iconClasses = classNames(
      'dialog-icon', 'circle', 'text-bold', 'float-right', 'mt-2'
   );

   return (
      <div class="relative mt-1">

         <div class={diaClasses}>
            {props.children}
         </div>

         <div class={ iconClasses }>
            i
         </div>

      </div>
   );
}

export { Dialog };

