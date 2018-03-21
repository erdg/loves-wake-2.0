import { h, Component } from 'preact';
// import style from './style';

import Toast from '../../components/toast';
import ConfirmAccountModal from './ConfirmAccountModal';
import MemorialList from './MemorialList';

export default class User extends Component {
   state = {
      showModal: true,

      // this now comes from the 'withAuth' HOC
      // // object of all user data
      // user: {
      //    nm: '',
      //    em: '',
      //    // avatar image URL
      //    avatar: '',
      //    confirmed: false,
      //    memorials: [
      //       // {name: "Randy", born: 1924, died: 1993},
      //       // {name: "Roger", born: 1946, died: 2003},
      //       // {name: "Robin", born: 1924, died: 2012},
      //    ]
      // }

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
            { this.props.user.confirmed ?
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
            }

            { !this.props.user.confirmed &&
               <ConfirmAccountModal
                  showModal={this.state.showModal}
                  hideModal={this.hideModal}
               />
            }


            {/* list memorials, or 'Start a memorial' button if none */}
            { this.props.user.memorials ?
                  <MemorialList memorials={this.props.user.memorials} />
                     :
                  <button
                     class="btn btn-primary"
                  >
                     Start a memorial
                  </button>
            }
                  

         </div>
      );
   }
}
