import { h, Component } from 'preact';
import { route } from 'preact-router';
// import style from './style';

import Toast from '../../components/toast';
import ConfirmAccountModal from './ConfirmAccountModal';
import MemorialList from './MemorialList';

export default class User extends Component {
   state = {
      showModal: true,
   }

   hideModal = () => {
      this.setState({ showModal: false });
   }
   
   neverShowConfirmationToastAgain = () => {
      console.log("We'll never show the confirmation toast again");
      // this.setState({ ... });
   }

   render() {
      return (
         <div>

            <h1>User Profile: {this.props.user.name || this.props.user.email}</h1>
            {/* has user confirmed account? display proper toast */}           
            {/* this.props.user.confirmed ?
               <Toast success active >
                  You're all set!
                  <button 
                     class="btn btn-clear float-right" 
                     onClick={this.neverShowConfirmationToastAgain}
                  />
               </Toast>
                  :
               <Toast error active >
                  You must confirm your account before saving any changes
               </Toast>
            */}

            { !this.props.user.confirmed &&
               <ConfirmAccountModal
                  showModal={this.state.showModal}
                  hideModal={this.hideModal}
               />
            }


            {/* list memorials, or 'Start a memorial' button if none */}
            { this.props.user.memorials[0] ?
                  <MemorialList memorials={this.props.user.memorials} />
                     :
                  <button
                     class="btn btn-primary"
                     onClick={() => route("/create-shrine")}
                  >
                     Start a memorial
                  </button>
            }
                  

         </div>
      );
   }
}
