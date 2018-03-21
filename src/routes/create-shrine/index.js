import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';

import { FlexContainer } from '../../components/FlexContainer';
import { CreateShrineFormContainer } from './create-shrine-form-container/';
import { AvatarRail } from './avatar-rail/';

class CreateShrine extends Component {
   state = {
      step: 1,

      firstName: '',
      lastName: '',
      born: '',
      died: '',
      subjPronoun: '',
      objPronoun: '',
      posPronoun: '',
      deceased: false,

      file: null,
      fileURL: ''
   };

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onFileChange = (e) => {
      // console.log(e);
      this.setState({ file: e.target.files[0] });
      this.makeFileURL();
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
      // // HACK - generate image when leaving step 2
      // if ((this.state.step === 2) && this.state.file) {
      //    this.makeFileURL();
      // }
      let step = this.state.step + 1;
      this.setState({ step: step });
   }

   gotoStep = (n) => {
      // HACK - generate image when leaving step 2
      // if ((this.state.step === 2) && this.state.file) {
      //    this.makeFileURL();
      // }
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

      fetch(API_ENDPOINT + "!newMemorial",
         {
            method: "POST",
            body: JSON.stringify({
               nm: this.state.firstName + " " + this.state.lastName,
               born: this.state.born,
               died: this.state.died,
               // strip trailing '='s so PL can handle it
               img: this.state.fileURL.split("=")[0],
               loginToken: loginToken
            })
         }
      )
         .then(res => res.json())
         .then(json => {
            // do something
         })
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

                     onChange={this.onChange}
                     onFileChange={this.onFileChange}
                     born={this.state.born}
                     died={this.state.died}

                     firstName={ firstName }
                     lastName={ lastName }

                     subjPronoun={ this.state.subjPronoun }
                     objPronoun={ this.state.objPronoun }
                     posPronoun={ this.state.posPronoun }
                     handleGenderChange={ this._handleGenderChange }

                     deceased={ this.state.deceased }
                     handleDeath={ this._handleDeath }
                  />
               }

            />

         </div>

      );
   }
}

export default CreateShrine;

