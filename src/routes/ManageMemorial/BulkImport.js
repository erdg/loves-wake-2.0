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
      var files = this.state.files;
      var cnt = 0;
      var nextFile = () => {
         return files[cnt++]
      }
      var newChronicle = (file) => {
         let reader = new FileReader();
         reader.readAsDataURL(file);
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
               newChronicle(nextFile());
            })
         }
      }
      newChronicle(nextFile());
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
            > Bulk Import
            </button>
         </div>
      );
   }
}

export default BulkImport;
