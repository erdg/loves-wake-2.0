import { h, Component } from 'preact';
import { route } from 'preact-router';
// import style from './style';

import GridContainer from '../../components/GridContainer';

import UserAvatar from './UserAvatar';

export default class UserSettings extends Component {
   state = {
      showModal: true,
   }

   hideModal = () => {
      this.setState({ showModal: false });
   }

   render() {
      return (
         <GridContainer
            avatarColumn={
               <div class="menu" style="z-index:1;">
                  <p>logged in as: {this.props.user.name || this.props.user.email}</p>
               </div>
            }

            contentColumn={
               <div>
                  <h3>Settings</h3>
                  <div class="divider" />
                  <UserAvatar img={this.props.user.img}/>
               </div>
            }
         />
      );
   }
}
