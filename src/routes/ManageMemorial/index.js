import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

import ContentList from './ContentList';

class ManageMemorial extends Component {
   render () {
      let urlName = this.props.name.split(/(?=[A-Z])/).join(" ");
      let memorial = this.props.user.memorials.find(m => m.name === urlName);
      console.log(memorial);
      return (
         <div>
            <h2>{memorial.name}</h2>
            <figure class="avatar avatar-xxl">
               <img src={memorial.avatar} />
            </figure>
            <ContentList items={memorial.items} />
         </div>
      )
   }
}

export default ManageMemorial;
