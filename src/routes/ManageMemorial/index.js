import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

import ContentList from './ContentList';
import EditModal from './EditModal';
import PublicUrl from './PublicUrl';

class ManageMemorial extends Component {
   state = {
      item: {},
      showModal: false
   }

   onChange = (e) => {
      let oldState = this.state.item;
      let newState = this.state.item;
      newState[e.target.name] = e.target.value;
      this.setState({ oldState: newState });
   }

   onFileChange = (e) => {
      let oldState = this.state.item;
      let newState = this.state.item;
      newState["file"] = e.target.files[0];
      this.setState({ oldState: newState });
      // needed to do this as a separate step so the state
      // updates properly. which means this is a hack.
      this.makeFileURL();
   }

   makeFileURL = () => {
      let oldState = this.state.item;
      let newState = this.state.item;
      let reader = new FileReader();

      reader.onload = (e) => {
        newState["src"] = e.target.result;
        this.setState({ oldState: newState })
      }

      reader.readAsDataURL(this.state.item.file);
   }

   updChronicle = () => {
      console.log('updChronicle');
      this.hideModal();
      let oldState = this.state.item;
      let newState = this.state.item;
      newState["edited"] = false;
      this.setState({ oldState: newState });
   }

   newChronicle = () => {
      this.hideModal();
      console.log('newChronicle');
   }

   showModal = (id) => {
      let memorial = this.props.user.memorials.find(m => m.urlNm === this.props.urlNm);
      this.setState({ showModal: true, item: memorial.items.find(item => item.id === id) });
   }

   hideModal = () => {
      let oldItem = this.state.item;
      let newItem = this.state.item;
      newItem["edited"] = true;
      this.setState({ 
         showModal: false, 
         modalError: false,
         oldItem: newItem
      });
   }

   newItem = () => {
      this.showModal();
      this.setState({ item: {} });
   }

   render () {
      let memorial = this.props.user.memorials.find(m => m.urlNm === this.props.urlNm);
      return (
         <div>
            <h2>{memorial.nm}</h2>
            <figure class="avatar avatar-xxl">
               <img src={memorial.avatar} />
            </figure>
            <PublicUrl nm1={memorial.nm1} urlStr={memorial.urlStr} urlNm={memorial.urlNm}/>
            <ContentList 
               showModal={this.showModal} 
               items={memorial.items} 
               newItem={this.newItem}
            />
            <EditModal 
               showModal={this.state.showModal}
               hideModal={this.hideModal}

               updChronicle={this.updChronicle}
               newChronicle={this.newChronicle}

               onChange={this.onChange}
               onFileChange={this.onFileChange}

               item={this.state.item}
            />
         </div>
      )
   }
}

export default ManageMemorial;
