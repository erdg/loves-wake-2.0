import { h, Component } from 'preact';
import marked from 'marked';
import classnames from 'classnames';
import { TextArea, TextInput, DateInput } from '../../components/form-inputs';

// add a new item to chronicle
class AddWrittenModal extends Component {
   constructor(props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
   }

   state = {
      title: '',
      date: '',
      text: ''
   }

   onChange = (e) => {
      this.setState({ text: e.target.value })
   }

   render (props) {
      let modalClasses = classnames(
         "modal", "modal-lg", { "active": props.showWrittenModal }, { "has-error": props.modalError}
      );

      let errorHint = classnames(
         "form-input-hint", "float-left", { "d-hide": !props.modalError }
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
                     Add Something to {props.name}'s Chronicle
                  </div>

               </div>

               <div class="modal-body">
                  <div class="content container columns">

                     <div class="card column col-7">
                        <div class="card-body"
                           dangerouslySetInnerHTML={{__html: marked(this.state.text)}}
                        />
                     </div>

                     <form class="form-group column col-5">

                        <TextInput 
                           label="Title" 
                           name="title" 
                           value={this.state.title} 
                           onInput={props.onChange} 
                        />

                        <DateInput 
                           label="Date" 
                           name="date"
                           value={this.state.date}
                           onChange={this.onChange}
                        />

                        <label class="form-label">Markdown</label>
                           <textarea 
                              class="form-input" 
                              rows="12" 
                              name="text"
                              value={this.state.text} 
                              onInput={this.onChange} 
                           />

                     </form>

                  </div>

               </div>


               <div class="modal-footer">

                  <p class={errorHint}>
                     Every post needs a title and date
                  </p>

                  <button
                     class="btn"
                     onClick={() => this.setState({ text: '' })}
                  >
                     Clear
                  </button>

                  <button 
                     class="btn btn-primary mx-2"
                  >
                     Add
                  </button>

               </div>

            </div>

         </div>
      );
   }
}

export default AddWrittenModal;
