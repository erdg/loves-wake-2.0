import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import { Link } from 'preact-router';

import GridContainer from '../../components/GridContainer';

import ContentList from './ContentList';
import EditModal from './EditModal';
import PublicUrl from './PublicUrl';

class ManageMemorial extends Component {
   state = {
      item: {},
      showModal: false,
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
            }
         />
      )
   }
}

export default ManageMemorial;
