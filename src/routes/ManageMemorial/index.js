import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

import ContentList from './ContentList';
import EditModal from './EditModal';

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

   updateItem = () => {
      this.hideModal();
      let oldState = this.state.item;
      let newState = this.state.item;
      newState["edited"] = false;
      this.setState({ oldState: newState });
   }


   showModal = (id) => {
      let urlName = this.props.name.split(/(?=[A-Z])/).join(" ");
      let memorial = this.props.user.memorials.find(m => m.name === urlName);
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
      let urlName = this.props.name.split(/(?=[A-Z])/).join(" ");
      let memorial = this.props.user.memorials.find(m => m.name === urlName);
      return (
         <div>
            <h2>{memorial.name}</h2>
            <figure class="avatar avatar-xxl">
               <img src={memorial.avatar} />
            </figure>
            <ContentList 
               showModal={this.showModal} 
               items={memorial.items} 
               newItem={this.newItem}
            />
            <EditModal 
               showModal={this.state.showModal}
               hideModal={this.hideModal}

               updateItem={this.updateItem}

               onChange={this.onChange}
               onFileChange={this.onFileChange}

               item={this.state.item}
            />
         </div>
      )
   }
}

export default ManageMemorial;
