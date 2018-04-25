import { h, Component } from 'preact';
import marked from 'marked';
import classnames from 'classnames';
import { TextArea, TextInput, DateInput } from '../../components/form-inputs';
import API_ENDPOINT from '../../api';

// add a new item to chronicle
class AddWrittenModal extends Component {
   constructor(props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
   }

   state = {
      modalError: false,

      title: '',
      date: '',
      text: '',
      html: ''
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   clearData = () => {
      this.setState({
         title: '',
         date: '',
         text: ''
      })
   }

   postWrittenChronicle = () => {
      // handle errors
      if (!(this.state.title && this.state.date)) {
         this.setState({ modalError: true });
         return;
      }
      this.setState({ modalError: false });

      // NOTE - this whole thing feels like a hack as the fetch call
      // is basically repeated. look into async/await or a promise.

      // EDIT URL BELOW
      fetch( API_ENDPOINT + "!postWrittenChronicle?" + this.props.urlNm,
         { 
            method: "POST", 
            body: JSON.stringify({ 
               title: this.state.title,
               date: this.state.date,
               txt: this.state.text,
            }) 
         }
      )
      .then( res => res.json() )
      .then( json => {
         console.log(json);
         // UPDATE TIMELINE STATE HERE
         // NOTE - this may not be necessary, as new entries
         // will likely go into a holding container to await
         // editing/approval by shrine moderator
         // this.refs.timeline.addItem(json);
         this.props.addItem(json);
      })
      .then(this.clearData());

      this.props.hideModal();
   }


   render (props) {
      let modalClasses = classnames(
         "modal", "modal-lg", { "active": props.showWrittenModal }, { "has-error": props.modalError}
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
                  <div class={width < 840 ? "content" : "content container columns"}>

                     <form class={width < 840 ? "form-group" : "form-group column col-5"}>

                        <TextInput 
                           label="Title" 
                           name="title" 
                           value={this.state.title} 
                           onChange={this.onChange} 
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

                     <div class={width < 840 ? "card" : "card column col-7"}>
                        <div class="card-body"
                           dangerouslySetInnerHTML={{__html: marked(this.state.text)}}
                        />
                     </div>

                  </div>

               </div>


               <div class="modal-footer">

                  <p class={errorHint}>
                     Every post needs a title and date
                  </p>

                  <button
                     class="btn"
                     onClick={this.clearData}
                  >
                     Clear
                  </button>

                  <button 
                     class="btn btn-primary mx-2"
                     onClick={this.postWrittenChronicle}
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
