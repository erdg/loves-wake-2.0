import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import { Link } from 'preact-router';

import GridContainer from '../../components/GridContainer';

import ContentList from './ContentList';
import EditModal from './EditModal';
import PublicUrl from './PublicUrl';
import BulkImport from './BulkImport';
import DeleteModal from './DeleteModal';

import Invitations from './Invitations';

import marked from 'marked';
import anime from 'animejs';

class ManageMemorial extends Component {
   constructor(props) {
      super(props);
      marked.setOptions({
         sanitize: true
      })
   }

   state = {
      item: {},
      showModal: false,
      showDeleteModal: false,

      active: 'chronicle',
      // 'forks' items from user data
      // allows to have UI update in response to deleting/editing items
      // very gross hack
      // this application needs a store, but I've decided to hack through
      // features, take on technical debt and refactor later
      items: this.props.user.memorials.find(m => m.urlNm === this.props.urlNm).items
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

      // handle errors
      if (!(this.state.item.title && this.state.item.start)) {
         alert("A new item must have a title and a date");
         return;
      }

      // NOTE - this whole thing feels like a hack as the fetch call
      // is basically repeated. look into async/await or a promise.

      // if there's an image to upload...
      if (this.state.item.file) {

         let reader = new FileReader();

         reader.readAsDataURL(this.state.item.file);

         reader.onload = (e) => {
            // base64 string without padding
            let str = e.target.result.split(',')[1]

            fetch( API_ENDPOINT + "!updChronicle",
               { 
                  method: "POST", 
                  body: JSON.stringify({ 
                     loginToken: window.sessionStorage.getItem("loginToken"),
                     urlNm: this.props.urlNm,
                     id: this.state.item.id,
                     title: this.state.item.title,
                     location: this.state.item.location,
                     date: this.state.item.start,
                     txt: this.state.item.txt,
                     image: str
                  }) 
               }
            )
            .then( res => res.json() )
            .then( json => {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               // this.addItem(json);
            })
            .then( this.setState({ 
               item: {}
            }));
            
         }

      } else {

         // EDIT URL BELOW
         fetch( API_ENDPOINT + "!updChronicle",
            { 
               method: "POST", 
               body: JSON.stringify({ 
                  loginToken: window.sessionStorage.getItem("loginToken"),
                  urlNm: this.props.urlNm,
                  id: this.state.item.id,
                  title: this.state.item.title,
                  location: this.state.item.location,
                  date: this.state.item.start,
                  txt: this.state.item.txt,
               }) 
            }
         )
         .then( res => res.json() )
         .then( json => {
            console.log(json);
            // UPDATE TIMELINE STATE HERE
            // NOTE - this may not be necessary, as new entries
            // will likely go into a holding container to await
            // editing/approval by shrine moderator
            // this.refs.timeline.addItem(json);
            // this.addItem(json);
         })
         .then( this.setState({ 
            item: {}
         }));

      }

      this.hideModal();
   }

   newChronicle = () => {
      console.log('newChronicle');
      // handle errors
      if (!(this.state.item.title && this.state.item.start)) {
         alert("A new item must have a title and a date");
         return;
      }

      // NOTE - this whole thing feels like a hack as the fetch call
      // is basically repeated. look into async/await or a promise.

      // if there's an image to upload...
      if (this.state.item.file) {

         let reader = new FileReader();

         reader.readAsDataURL(this.state.item.file);

         reader.onload = (e) => {
            // NOTE - must remove padding for picolisp
            //
            // base64 strings are padded with one or two '='s to make sure it aligns
            // to proper byte boundaries. the picolisp server does not handle this 
            // well. so we must remove any padding before it is sent. after picolisp
            // has parsed the http request, we can add the appropriate padding back
            // to the string by checking if it is an even multiple of 4.
            //
            // see 'server.l' for the picolisp side.
            //
            // NOTE - turns out that we don't need to add padding back on the server
            // as the base64 utility is still able to decode.

            // base64 string without padding
            let str = e.target.result.split(',')[1]

            fetch( API_ENDPOINT + "!newChronicle",
               { 
                  method: "POST", 
                  body: JSON.stringify({ 
                     urlNm: this.props.urlNm,
                     title: this.state.item.title,
                     subtitle: this.state.item.subtitle,
                     location: this.state.item.location,
                     date: this.state.item.start,
                     txt: this.state.item.txt,
                     image: str
                  }) 
               }
            )
               .then( res => res.json() )
               .then( json => {
                  console.log(json);
                  // UPDATE TIMELINE STATE HERE
                  // NOTE - this may not be necessary, as new entries
                  // will likely go into a holding container to await
                  // editing/approval by shrine moderator
                  // this.refs.timeline.addItem(json);
                  this.addItem(json);
               })
               .then( this.setState({ 
                  item: {}
               }));

         }

      } else {

         // EDIT URL BELOW
         fetch( API_ENDPOINT + "!newChronicle",
            { 
               method: "POST", 
               body: JSON.stringify({ 
                  urlNm: this.props.urlNm,
                  title: this.state.item.title,
                  subtitle: this.state.item.subtitle,
                  location: this.state.item.location,
                  date: this.state.item.start,
                  txt: this.state.item.txt,
               }) 
            }
         )
            .then( res => res.json() )
            .then( json => {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               this.addItem(json);
            })
            .then( this.setState({ 
               item: {}
            }));

      }

      this.hideModal();
   }

   delChronicle = () => {
      fetch(API_ENDPOINT + "!delChronicle", {
         method: "POST",
         body: JSON.stringify({
            id: this.state.item.id,
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      }).then(res => res.json()).then(json => {
         this.hideDeleteModal();
         let item =  this.state.items.find(item => item.id === this.state.item.id);
         console.log(item);
         let delAnimation = anime.timeline();
         delAnimation.add({
            targets: '.item-' + item.id,
            scale: 1.1,
            duration: 100
         }).add({
            targets: '.item-' + item.id,
            scale: 0,
            duration: 500,
            complete: () => {
               let items = this.state.items.filter( i => i !== item );
               this.setState({ items: items });
               var el = document.querySelector('.item-' + item.id);
               el.parentNode.removeChild(el);
            }
         })
      })
   }

   updInvitation = (updated) => {
      this.setState((prevState) => ({ invitation: updated }));
      if (!this.state.invitation) { return; }
      let markdown = marked(this.state.invitation);
      console.log(markdown);
      fetch(API_ENDPOINT + "!updInvitation", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            memorial: this.props.urlNm,
            markdown: markdown,
            invitation: this.state.invitation
         })
      })
      .then(res => res.json())
      .then(json => {
         console.log(json);
      });
   }

   showModal = (id) => {
      let memorial = this.props.user.memorials.find(m => m.urlNm === this.props.urlNm);
      this.setState({ showModal: true, item: memorial.items.find(item => item.id === id) });
   }

   showDeleteModal = (id) => {
      let memorial = this.props.user.memorials.find(m => m.urlNm === this.props.urlNm);
      this.setState({ showDeleteModal: true, item: memorial.items.find(item => item.id === id) });
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

   hideDeleteModal = () => {
      this.setState({ showDeleteModal: false });
   }

   newItem = () => {
      this.showModal();
      this.setState({ item: {} });
   }

   render () {
      let memorial = this.props.user.memorials.find(m => m.urlNm === this.props.urlNm)
      return (
         <GridContainer
            avatarColumn={
               <div class="menu" style="z-index:1;">
                     <figure class="centered avatar avatar-xxl"> 
                        <img src={memorial.avatar} />
                     </figure>
                     <h3 class="text-center mt-2">{memorial.nm}</h3>
                     <div class="divider" />
                     <li class="menu-item">
                        <Link class="menu-item" href={"/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle"}>
                           View Chronicle
                        </Link>
                     </li>
               </div>
            }
            contentColumn={
               <div>
                  {/*
                  <PublicUrl 
                     nm1={memorial.nm1} 
                     urlStr={memorial.urlStr} 
                     urlNm={memorial.urlNm}
                  />
                  */}
                  <ul class="tab tab-block">
                     <li class={"tab-item c-hand " + (this.state.active === "chronicle" ? "active" : "")}>
                        <a onClick={() => this.setState({ active: "chronicle" })}
                        >Chronicle
                        </a>
                     </li>
                     <li class={"tab-item c-hand " + (this.state.active === "atlas" ? "active" : "")}>
                        <a onClick={() => this.setState({ active: "atlas" })}
                        > Atlas
                        </a>
                     </li>
                     <li class={"tab-item c-hand " + (this.state.active === "shrine" ? "active" : "")}>
                        <a onClick={() => this.setState({ active: "shrine" })}
                        >Shrine</a>
                     </li>
                     <li class={"tab-item c-hand " + (this.state.active === "invitations" ? "active" : "")}>
                        <a onClick={() => this.setState({ active: "invitations" })}
                        > Invitations
                        </a>
                     </li>
                  </ul>
                  { this.state.active === "chronicle" &&
                     <div>
                        <BulkImport 
                           urlNm={memorial.urlNm}
                        />
                        <ContentList 
                           showModal={this.showModal} 
                           items={this.state.items} 
                           newItem={this.newItem}
                           showDeleteModal={(id) => this.showDeleteModal(id)}
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
                        <DeleteModal
                           item={this.state.item}
                           delChronicle={this.delChronicle}
                           showDeleteModal={this.state.showDeleteModal}
                           hideDeleteModal={this.hideDeleteModal}
                        />
                     </div>
                  }
                  { this.state.active === "atlas" &&
                     <div>This is the Atlas component</div>
                  }
                  { this.state.active === "shrine" &&
                     <div>This is the Shrine component</div>
                  }
                  { this.state.active === "invitations" &&
                        <Invitations 
                           memorial={memorial}
                           updInvitation={(updated) => this.updInvitation(updated)}
                        />
                  }
               </div>
            }
         />
      )
   }
}

export default ManageMemorial;
