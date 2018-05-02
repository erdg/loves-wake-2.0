import { h, Component } from 'preact';
import classnames from 'classnames';
import { TextArea, TextInput, DateInput } from '../../components/form-inputs';
import ChronicleCard from './ChronicleCard';

// add a new item to chronicle
const ChronicleModal = (props) => {
   let modalClasses = classnames(
      "modal", "modal-lg", { "active": props.showModal }, { "has-error": props.modalError}
   );

   let errorHint = classnames(
      "form-input-hint", "float-left", { "d-hide": !props.modalError }
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
                  Add Something to {props.name}'s Chronicle
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
                        value={props.title} 
                        onInput={props.onChange} 
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
                        value={props.location}
                        onInput={props.onChange}
                     />

                     <DateInput 
                        label="Date" 
                        name="date"
                        value={props.date}
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
                        Add a photo
                        <input 
                           class="form-input"
                           type="file" 
                           accept=".jpg, .jpeg, .png"
                           value={props.file} 
                           onChange={props.onFileChange}
                        />
                     </label>

                     <button
                        class={ width < 840 ? "btn" : "btn float-right" }
                        onClick={props.clearModalFields}
                     >
                        Clear fields
                     </button>

                  </form>

                  <div class={ width < 840 ? "" : "column col-7" }>
                     <ChronicleCard 
                        title={props.title}
                        location={props.location}
                        date={props.date}
                        src={props.src}
                        style
                     />
                  </div>
               </div>

            </div>


            <div class="modal-footer">

               <p class={errorHint}>
                  Every post needs a title and date
               </p>

               <button 
                  class="btn btn-primary"
                  onClick={props.newChronicle}
               >
                  Add
               </button>

            </div>

         </div>

      </div>
   );
}

export default ChronicleModal;
