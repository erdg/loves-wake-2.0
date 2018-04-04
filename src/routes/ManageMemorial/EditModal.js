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

               </div>

               <div class="modal-body">
                  <div class="content container columns">

                     <div class="column col-6">
                        <EditCard item={props.item} />
                     </div>

                     {/* <div class="column col-1 divider-vert" /> */}

                     <form class="form-group column col-6">

                        <TextInput 
                           label="Title" 
                           name="title" 
                           value={props.item.title} 
                           onChange={props.onChange} 
                        />

                        {/*
                        <TextInput 
                           label="Subtitle" 
                           name="subtitle"
                           value={props.subtitle}
                           onChange={props.onChange}
                        />
                        */}

                        <TextInput 
                           label="Location" 
                           name="location"
                           value={props.item.location}
                           onChange={props.onChange}
                        />

                        <DateInput 
                           label="Date" 
                           name="start"
                           value={props.item.start}
                           onChange={props.onChange}
                        />

                        {/*
                        <TextArea 
                           label="Caption" 
                           rows="6"
                           name="txt"
                           value={props.txt}
                           onChange={props.onChange}
                        />
                        */}

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
