import { h, Component } from 'preact';
import classnames from 'classnames';

// edit a chronicle item
class DeleteModal extends Component {

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-sm", { "active": props.showDeleteModal }
      );

      return (
         <div class={modalClasses}>

            <a onClick={props.hideDeleteModal} 
               class="modal-overlay" 
               aria-label="Close" 
            />

            <div class="modal-container">

               <div class="modal-header">

                  <a onClick={props.hideDeleteModal} 
                     class="btn btn-clear float-right" 
                     aria-label="Close"
                  />

                  <div class="modal-title h5">
                     Delete Item?
                  </div>

               </div>

               <div class="modal-body">
                  Are you sure you want to delete this item? This action
                  cannot be undone.
               </div>


               <div class="modal-footer">
                  <button class="btn"
                     onClick={props.hideDeleteModal}
                  > Cancel
                  </button>
                  <button 
                     class="btn btn-error"
                     onClick={(id) => props.delChronicle(props.item.id)}
                  > Delete Item
                  </button>
               </div>

            </div>

         </div>
      );
   }

}

export default DeleteModal;
