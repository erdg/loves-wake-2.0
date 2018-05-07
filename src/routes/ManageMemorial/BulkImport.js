import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

class BulkImport extends Component {
   state = {
      files: [],
      filesUploaded: 0
   }

   onFileChange = (e) => {
      this.setState({
         files: e.target.files,
         filesUploaded: 0
      });
   }

   bulkImport = () => {
      this.setState({ filesUploaded: 0 });
      var files = this.state.files;
      if (files.length === 0) { 
         alert('No files selected.');
         return; 
      }
      var cnt = 0;
      var nextFile = () => {
         return files[cnt++];
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
               this.setState((prevState) => ({ filesUploaded: prevState.filesUploaded + 1 }));
               newChronicle(nextFile());
               console.log(json);
            })
         }
      }
      newChronicle(nextFile());
   }

   render () {
      return (
         <div class="row" style="margin-bottom:32px;">
            <h4>Bulk Import</h4>
            <input 
               class="form-input col"
               style="max-width:400px"
               type="file" 
               accept=".png, .jpg, .jpeg" 
               value={this.state.files}
               onChange={this.onFileChange}
               multiple 
            />
            <button class="btn btn-primary col float-right"
               onClick={this.bulkImport}
            > Bulk Import
            </button>
            { this.state.filesUploaded > 0 &&
               <div>
                  <div class="bar">
                     <div class="bar-item"
                        role="progressbar"
                        style={"width:" + (this.state.filesUploaded / this.state.files.length * 100) + "%;"}
                        aria-valuenow={this.state.filesUploaded.toString()} 
                        aria-valuemin="0" 
                        aria-valuemax={this.state.files.length.toString()}
                     />
                  </div>
                  <div>{this.state.filesUploaded}/{this.state.files.length} uploaded</div>
               </div>
            }
         </div>
      );
   }
}

export default BulkImport;
