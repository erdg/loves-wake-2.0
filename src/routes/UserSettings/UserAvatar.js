import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import GridContainer from '../../components/GridContainer';

class UserAvatar extends Component {
   state = {
      file: '',
      src: ''
   }

   onChange = (e) => {
      this.setState({ 
         file: e.target.files[0]
      });
      this.makeFileURL();
   }

   makeFileURL = () => {
      let reader = new FileReader();
      reader.readAsDataURL(this.state.file);
      reader.onload = (e) => {
        this.setState({ src: e.target.result });
      }
   }

   updUserAvatar = () => {
      fetch(API_ENDPOINT + "!updUserAvatar", {
         method: 'POST',
         body: JSON.stringify({
            image: this.state.src.split(',')[1],
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      })
      .then(res => res.json())
      .then(json => {
         console.log(json);
      })
   }

   render () {
      return (
         <div class="tile">
            <div class="tile-icon">
               <figure class="avatar avatar-lg">
                  <img src={this.state.src || this.props.img} />
               </figure>
            </div>
            <div class="tile-content">
               <div class="tile-title">
                  Avatar
               </div>
            </div>
            <div class="tile-action">
               <input type="file" accept=".png, .jpg, .jpeg"
                  value={this.state.file} 
                  onChange={this.onChange}
               />
               <button class="btn btn-primary"
                  onClick={this.updUserAvatar}
               > Update Avatar
               </button>
            </div>
         </div>
      )
   }
}

export default UserAvatar;
