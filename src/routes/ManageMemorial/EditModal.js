import { h, Component } from 'preact';
import classnames from 'classnames';
import { TextArea, TextInput, DateInput } from '../../components/form-inputs';
import EditCard from './EditCard';

// edit a chronicle item
class EditModal extends Component {

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-lg", { "active": props.showModal }, { "has-error": props.modalError}
      );

      var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;

      return (
         <div class={modalClasses}>

            <a onClick={props.hideModal} 
               class="modal-overlay" 
               aria-label="Close" 
            />

            <div class="modal-container">

               <div class="modal-header">

                  <a onClick={props.hideModal} 
                     class="btn btn-clear float-right" 
                     aria-label="Close"
                  />

                  <div class="modal-title h5">
                     { props.item.id ?
                        "Edit Item"
                           :
                        "Add Item"
                     }
                  </div>

               { width < 840 &&
                  <div class="text-center text-gray" style="font-size:smaller;">
                     - Scroll down to see a preview -
                  </div>
               }

               </div>

               <div class="modal-body">
                  <div class={ width < 840 ? "content" : "content container columns"}>

                     <form class={ width < 840 ? "form-group" : "form-group column col-5"}>

                        <TextInput 
                           label="Title" 
                           name="title" 
                           value={props.item.title} 
                           onInput={props.onChange} 
                        />

                        <TextInput 
                           label="Location" 
                           name="location"
                           value={props.item.location}
                           onInput={props.onChange}
                        />

                        <DateInput 
                           label="Date" 
                           name="start"
                           value={props.item.start}
                           onChange={props.onChange}
                        />

                        <label
                           class="form-label"
                        >
                           Change photo
                           <input 
                              class="form-input"
                              type="file" 
                              accept=".jpg, .jpeg, .png"
                              value={props.item.file} 
                              onChange={props.onFileChange}
                           />
                        </label>

                     </form>

                     <div class={ width < 840 ? "" : "column col-7" }>
                        <EditCard item={props.item} />
                     </div>

                  </div>

               </div>


               <div class="modal-footer">

                  <button 
                     class="btn btn-primary"
                     onClick={ props.item.id ? props.updChronicle : props.newChronicle } 
                  >
                     { props.item.id ?
                        "Update item"
                           :
                        "Add item"
                     }
                  </button>

               </div>

            </div>

         </div>
      );
   }

}

export default EditModal;
