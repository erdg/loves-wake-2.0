import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
import { route } from 'preact-router';

import marked from 'marked';

import { FlexContainer } from '../../components/FlexContainer';
import { CreateShrineFormContainer } from './create-shrine-form-container/';
import { AvatarRail } from './avatar-rail/';

class CreateShrine extends Component {
   state = {
      step: 1,

      // memorial is created in step 3
      // this is will hold a reference, so invitations
      // and invite list can be added to the memorial
      memorial: {},

      firstName: '',
      middleName: '',
      lastName: '',
      born: '',
      died: '',
      subjPronoun: '',
      objPronoun: '',
      posPronoun: '',
      deceased: false,

      file: null,
      fileURL: '',

      invitation: '',

      loading: false
   };

   componentDidMount () {
      marked.setOptions({
         sanitize: true
      });
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onFileChange = (e) => {
      // console.log(e);
      this.setState({ file: e.target.files[0] });
      this.makeFileURL();
   }

   setInvitation = (txt) => {
      this.setState({ invitation: txt });
   }

   makeFileURL = () => {
      console.log('reading file');
      let reader = new FileReader();

      reader.onload = (e) => {
         this.setState({ fileURL: e.target.result });
      }

      reader.readAsDataURL(this.state.file);
   }

   _handleNextStep = () => {
      let step = this.state.step + 1;
      this.setState({ step: step });
   }

   gotoStep = (n) => {
      this.setState({ step: n })
   }

   _handlePrevStep = () => {
      let step = this.state.step - 1;
      this.setState({ step: step });
   }

   _handleGenderChange = (e) => {
      if ( e.target.value === 'Male' ) {
         this.setState({ 
            subjPronoun: 'he', 
            objPronoun: 'him',
            posPronoun: 'his'
         });
      } else if ( e.target.value === 'Female' ) {
         this.setState({ 
            subjPronoun: 'she', 
            objPronoun: 'her',
            posPronoun: 'her'
         });
      }
   }

   // this is a terrible function name...
   // as if death could be handled with 3 lines of code.
   _handleDeath = (e) => {
      if ( e.target.value === "true" ) {
         this.setState({ deceased: true });
      } else if ( e.target.value === "false" ) {
         this.setState({ deceased: false });
      }
   }

   newMemorial = () => {
      let loginToken = window.sessionStorage.getItem("loginToken");

      // abort if no name or birth date
      if (!(this.state.firstName && this.state.born)) {
         alert("A memorial needs at least a first name and birth date to be created. "
            + "Please go to the corresponding pages and enter that information before continuing");
         return;
      }
      this.setState({ loading: true });
      fetch(API_ENDPOINT + "!newMemorial",
         {
            method: "POST",
            body: JSON.stringify({
               nm1: this.state.firstName,
               nm2: this.state.middleName,
               nm3: this.state.lastName,
               born: this.state.born,
               died: this.state.died,
               // strip leading "data:image/${mime};base64," so PL can
               // send it to "base64 -d" without having to 'chop' it.
               img: this.state.fileURL.split(",")[1],
               loginToken: loginToken
            })
         }
      )
         .then(res => res.json())
         .then(json => {
            this.setState({ loading: false });
            this.setState({ memorial: json });
            // route("/user");
            this.setState((prevState) => ({ step: prevState.step + 1 }));
         })
   }

   updInvitation = () => {
      if (!this.state.invitation) { return; }
      fetch(API_ENDPOINT + "!updInvitation", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            memorial: this.state.memorial.urlNm,
            invitation: this.state.invitation,
            markdown: marked(this.state.invitation)
         })
      })
      .then(res => res.json())
      .then(json => {
         this.setState((prevState) => ({step: prevState.step + 1}));
      });
   }

   render (props) {

      const step = this.state.step;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;

      return (

         <div>

            <div class="flex-container-heading">
               {/* dynamic heading */}
               {
                  step > 1 && firstName 
                     ?
                     <h1>{firstName}'s Shrine</h1>
                     :
                     <h1> Create a New Shrine</h1>
               }

               <p class="text-gray">
                  Step {step} of 6
               </p>
            </div>

            <FlexContainer 

               avatarRail={
                  <AvatarRail 
                     step={ step }
                     firstName={ firstName }
                     lastName={ lastName }
                     gotoStep={(n) => this.gotoStep(n)}
                     src={this.state.fileURL}
                  />
               }

               formRail={
                  <CreateShrineFormContainer
                     step={ step }
                     handleNextStep={ this._handleNextStep }
                     handlePrevStep={ this._handlePrevStep }

                     newMemorial={this.newMemorial}
                     loading={this.state.loading}

                     onChange={this.onChange}
                     onFileChange={this.onFileChange}
                     born={this.state.born}
                     died={this.state.died}

                     setInvitation={this.setInvitation}
                     updInvitation={this.updInvitation}
                     invitation={this.state.invitation}

                     firstName={ firstName }
                     middleName={this.state.middleName}
                     lastName={ lastName }

                     subjPronoun={ this.state.subjPronoun }
                     objPronoun={ this.state.objPronoun }
                     posPronoun={ this.state.posPronoun }
                     handleGenderChange={ this._handleGenderChange }

                     deceased={ this.state.deceased }
                     handleDeath={ this._handleDeath }

                     memorial={this.state.memorial}
                  />
               }

            />

         </div>

      );
   }
}

export default CreateShrine;

