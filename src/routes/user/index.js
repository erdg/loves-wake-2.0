import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
// import style from './style';

import GridContainer from '../../components/GridContainer';
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
         <GridContainer
            avatarColumn={
               <div class="menu" style="z-index:1;">
                  <p>logged in as: {this.props.user.name || this.props.user.email}</p>
                  <Link href="/user/settings">Settings</Link>
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
               </div>
            }

            contentColumn={
               <div>
                  <MemorialList memorials={this.props.user.memorials} />
               </div>
            }
         />
      );
   }
}
