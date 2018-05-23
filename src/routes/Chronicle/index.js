import { h, Component } from 'preact';
import style from './style';
import './linked-ref';

// API
import API_ENDPOINT from '../../api';

import anime from 'animejs';
import Hammer from 'hammerjs';

// generic components
import GridContainer from '../../components/GridContainer';
import AvatarRail from '../../components/AvatarRail';

// route specific components
import TimeLine from './TimeLine';
import ChronicleCard from './ChronicleCard';
import ChronicleModal from './ChronicleModal';
import AddSomethingBtn from './AddSomethingBtn';
import AddSomethingBtn2 from './AddSomethingBtn2';
import AddWrittenModal from './AddWrittenModal';

export default class Chronicle extends Component {
   state = {
      showModal: false,
      showWrittenModal: false,
      modalError: false,

      // modal fields
      title: '',
      // subtitle: '',
      location: '',
      date: '',
      // txt: '',    // description
      file: '',   // image file
      src: '',    // image file url, for preview

      nm: '',
      nm1: '',
      nm2: '',
      nm3: '',
      // avatar image url
      avatar: '',
      born: '',
      died: '',
      // timeline data
      currentItem: {},
      items: []
   }


   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onFileChange = (e) => {
      console.log(e.target.files[0].type);
      this.setState({ file: e.target.files[0] });
      this.makeFileURL();
   }

   makeFileURL = () => {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.setState({ src: e.target.result })
      }

      reader.readAsDataURL(this.state.file);
   }

   newChronicle = () => {
      // handle errors
      if (!(this.state.title && this.state.date)) {
         this.setState({ modalError: true });
         return;
      }
      this.setState({ modalError: false });

      // NOTE - this whole thing feels like a hack as the fetch call
      // is basically repeated. look into async/await or a promise.
      this.hideModal();

      // if there's an image to upload...
      if (this.state.file) {

         let reader = new FileReader();

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
            let str = e.target.result.split(',')[1];
            let blob = this.state.file.type.split('/')[0];

            fetch( API_ENDPOINT + "!newChronicle",
               { 
                  method: "POST", 
                  body: JSON.stringify({ 
                     urlNm: this.props.urlNm,
                     title: this.state.title,
                     subtitle: this.state.subtitle,
                     location: this.state.location,
                     date: this.state.date,
                     txt: this.state.txt,
                     [blob]: str
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
               title: '',
               subtitle: '',
               location: '',
               date: '',
               txt: '',
               file: ''
            }));
            
         }

         reader.readAsDataURL(this.state.file);

      } else {

         // EDIT URL BELOW
         fetch( API_ENDPOINT + "!newChronicle",
            { 
               method: "POST", 
               body: JSON.stringify({ 
                  urlNm: this.props.urlNm,
                  title: this.state.title,
                  subtitle: this.state.subtitle,
                  location: this.state.location,
                  date: this.state.date,
                  txt: this.state.txt,
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
            title: '',
            subtitle: '',
            location: '',
            date: '',
            txt: '',
            file: ''
         }));

      }

   }

   addItem = (item) => {
      this.refs.timeline.addItem(item);
      let newState = [...this.state.items, item];
      let sortedState = newState.sort((a, b) => parseInt(a.start.split("-").join("")) - parseInt(b.start.split("-").join("")));
      this.setState({ items: sortedState, currentItem: item });
   }

   componentDidMount () {
      // init swipe stuff
      this.hammer = Hammer(document.getElementById('ChronicleCard'));
      this.hammer.on('swipeleft', this.nextItem);
      this.hammer.on('swiperight', this.prevItem);

      // should init animations here, probably inefficient to
      // create a new animation timeline every single time the
      // button is clicked
      this.nextAnimation = anime.timeline({autoplay: false});
      this.nextAnimation.add({
         targets: '.panel',
         translateX: -2000, 
         duration: 250, 
         opacity: 0,
         scale: 0.3,
         easing: 'easeInSine',
         complete: () => {
            this.setState((prevState) => ( 
               { currentItem: prevState.items[prevState.items.indexOf(prevState.currentItem) + 1] }
            ));
            this.refs.timeline.selectItem(this.state.currentItem);
         }
      }).add({
         targets: '.panel',
         translateX: [1000, 0],
         duration: 500, 
         opacity: 1,
         scale: ['*=0.3', 1],
         easing: 'easeInSine'
      });

      this.prevAnimation = anime.timeline({autoplay: false});
      this.prevAnimation.add({
         targets: '.panel',
         translateX: 1000, 
         duration: 250, 
         opacity: 0,
         scale: '0.3',
         easing: 'easeInSine',
         complete: () => {
            this.setState((prevState) => ( 
               { currentItem: prevState.items[prevState.items.indexOf(prevState.currentItem) - 1] }
            ));
            this.refs.timeline.selectItem(this.state.currentItem);
         }
      }).add({
         targets: '.panel',
         translateX: [-2000, 0],
         duration: 500, 
         opacity: 1,
         scale: ['*=0.3', 1],
         easing: 'easeInSine'
      });

      // fetch chronicle items
      fetch( API_ENDPOINT + "!getChronicle?" + this.props.urlStr + "&" + this.props.urlNm)
      .then(res => res.json())
      .then(json => {
         // sort items by date, earliest first
         let sorted = json.items.sort((a, b) => parseInt(a.start.split("-").join("")) - parseInt(b.start.split("-").join("")));
         this.setState({ 
            items: sorted, 
            currentItem: sorted[0],

            nm: json.nm,
            nm1: json.nm1,
            nm2: json.nm2,
            nm3: json.nm3,
            avatar: json.avatar,
            born: json.born,
            died: json.died
         });
      });
   }

   changeItem = (id) => {
      let current = this.state.items.find(x => x.id === id);
      this.setState({ currentItem:  current });
   }

   clearModalFields = (e) => {
      e.preventDefault();
      this.setState({
         title: '',
         location: '',
         date: '',
         file: '',
         src: ''
      })
   }

   showModal = () => {
      this.setState({ showModal: true });
   }

   showWrittenModal = () => {
      this.setState({ showWrittenModal: true });
   }

   hideModal = () => {
      this.setState({ 
         showModal: false, 
         showWrittenModal: false, 
         modalError: false 
      });
   }

   prevItem = () => {
      let index = this.state.items.indexOf(this.state.currentItem);
      // make sure it's not the first item in array
      if (!(index === 0)) {
         this.prevAnimation.restart();
         // let prevAnimation = anime.timeline();
         // prevAnimation.add({
         //    targets: '.panel',
         //    translateX: 1000, 
         //    duration: 250, 
         //    opacity: 0,
         //    scale: '0.3',
         //    easing: 'easeInSine',
         //    complete: () => {
         //       this.setState({ currentItem: this.state.items[index - 1] });
         //       this.refs.timeline.selectItem(this.state.currentItem);
         //    }
         // }).add({
         //    targets: '.panel',
         //    translateX: [-2000, 0],
         //    duration: 500, 
         //    opacity: 1,
         //    scale: ['*=0.3', 1],
         //    easing: 'easeInSine'
         // });
      }
   }

   nextItem = () => {
      let length = this.state.items.length;
      let index = this.state.items.indexOf(this.state.currentItem);
      if (!(index === length - 1)) {
         this.nextAnimation.restart();
         // this needs work
         // let nextAnimation = anime.timeline();
         // nextAnimation.add({
         //    targets: '.panel',
         //    translateX: -2000, 
         //    duration: 250, 
         //    opacity: 0,
         //    scale: 0.3,
         //    easing: 'easeInSine',
         //    complete: () => {
         //       this.setState({ currentItem: this.state.items[index + 1] });
         //       this.refs.timeline.selectItem(this.state.currentItem);
         //    }
         // }).add({
         //    targets: '.panel',
         //    translateX: [1000, 0],
         //    duration: 500, 
         //    opacity: 1,
         //    scale: ['*=0.3', 1],
         //    easing: 'easeInSine'
         // });
      }
   }

   // Note: `user` comes from the URL, courtesy of our router
   render (props, state) {
      return (
         <GridContainer
            avatarColumn={
               <AvatarRail
                  firstName={this.state.nm1} 
                  urlNm={props.urlNm}
                  urlStr={props.urlStr}
                  avatar={this.state.avatar}
               />
            }

            contentColumn={
               <div class={style.ContentColumnContainer}>
                  <ChronicleCard class="column" stylesheet
                     title={this.state.currentItem.title}
                     location={this.state.currentItem.location}
                     date={this.state.currentItem.start}
                     imageSrc={this.state.currentItem.imageSrc}
                     audioSrc={this.state.currentItem.audioSrc}
                     videoSrc={this.state.currentItem.videoSrc}
                     txt={this.state.currentItem.txt}
                  />

                  <AddSomethingBtn2
                     showModal={this.showModal} 
                     showWrittenModal={this.showWrittenModal}
                  />

                  {/* left arrow button */}
                  <button 
                     class={"circle btn " + style.LeftArrow}
                     onClick={this.prevItem}
                  >
                     <i class="icon icon-arrow-left" />
                  </button>

                  {/* right arrow button */}
                  <button 
                     class={"circle btn float-right " + style.RightArrow}
                     onClick={this.nextItem}
                  >
                     <i class="icon icon-arrow-right" />
                  </button>

                  <TimeLine 
                     ref={ this.linkRef('timeline') }
                     data={this.state.items} 
                     born={this.state.born.split("-")[0]}
                     changeItem={this.changeItem}
                  />

                  <ChronicleModal 
                     showModal={this.state.showModal} 
                     hideModal={this.hideModal}
                     modalError={this.state.modalError}

                     name={this.state.nm1}

                     onChange={this.onChange}
                     onFileChange={this.onFileChange}

                     title={this.state.title}
                     subtitle={this.state.subtitle}
                     location={this.state.location}
                     date={this.state.date}
                     txt={this.state.txt}
                     file={this.state.file}
                     src={this.state.src}

                     newChronicle={this.newChronicle}
                     clearModalFields={this.clearModalFields}
                  />

                  <AddWrittenModal
                     showWrittenModal={this.state.showWrittenModal}
                     hideModal={this.hideModal}
                     name={this.state.nm1}
                     addItem={(item) => this.addItem(item)}
                     urlNm={props.urlNm}
                  />

               </div>
            }
         />
      );
   }
}
