import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

class BulkImport extends Component {
   state = {
      files: []
   }

   onFileChange = (e) => {
      this.setState({
         files: e.target.files
      });
   }

   bulkImport = () => {
      for (var i = 0; i < this.state.files.length; i++) {

         console.log(this.state.files[i]);

         let reader = new FileReader();
         reader.readAsDataURL(this.state.files[i]);
         reader.onload = (e) => {
            // base64 string with leading "data:image/${mime};base64," stripped
            let str = e.target.result.split(',')[1]
            fetch( API_ENDPOINT + "!newChronicle", { 
               method: "POST", 
               body: JSON.stringify({ 
                  loginToken: window.sessionStorage.getItem("loginToken"),
                  urlNm: this.props.urlNm,
                  image: str
               }) 
            })
            .then(res => res.json())
            .then(json => {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               // this.addItem(json);
            });
         }
      }
   }

   render () {
      return (
         <div>
            <input 
               class="form-input"
               type="file" 
               accept=".png, .jpg, .jpeg" 
               value={this.state.files}
               onChange={this.onFileChange}
               multiple 
            />
            <button class="btn btn-primary"
               onClick={this.bulkImport}
            >
               Bulk Import
            </button>
         </div>
      );
   }
}

export default BulkImport;
