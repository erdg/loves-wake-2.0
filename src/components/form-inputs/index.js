import { h, Component } from 'preact';

const Radio = ({ label, name, ...props }) => (
   <label class="form-radio">
      <input 
         {...props}
         name={name} 
         type="radio" 
      />
      <i class="form-icon" />
      { label }
   </label>
)

const Label = (props) => (
   <label class="form-label">{ props.children }</label>
)

const EmailInput = (props) => (
   <div>
      <label class="form-label">Email</label>
      <input
         {...props}
         type="email"
         class="form-input" 
         placeholder="Your email"
      />
   </div>
)

const TextInput = ({ label, ...props}) => (
   <div>
      <label class="form-label">
         {label}
      </label>
      <input
         {...props}
         type="text"
         class="form-input"
      />
   </div>
)

const TextArea = ({ label, ...props }) => (
   <div>
      <label class="form-label">
         {label}
      </label>
      <textarea
         class="form-input"
         {...props}
      />
   </div>
)

const DateInput = ({ label, ...props }) => (
   <div>
      <label class="form-label">
         {label}
      </label>
      <input
         {...props}
         type="date"
         class="form-input"
      />
   </div>
)

const FileInput = ({ label, ...props}) => (
   <div>
      <label class="form-label">
         {label}
      </label>
      <input
         {...props}
         type="file"
         class={ "form-input " + props.class }
      />
   </div>
)


const NumberInput = (props) => (
   <input 
      type="number"
      class="form-input"
      {...props}
   />
)

class PasswordInput extends Component {

   constructor (props) {
      super(props);
      this._toggleShowPassword = this._toggleShowPassword.bind(this);
      this.state = {
         showPassword: false
      };
   }

   _toggleShowPassword () {
      let showPassword = !this.state.showPassword;
      this.setState({ showPassword });
   }

   render (props) {
      let label = props.label ? props.label : 'Password';
      return (
         <div>

            <label class="form-label">
               { label }
            </label>
            <input 
               {...props}
               class="form-input" 
               type={ this.state.showPassword ? "text" : "password" }
               placeholder="Your password"
            />

            <ShowPasswordSwitch onClick={ this._toggleShowPassword } />

         </div>
      )
   }
}

const ShowPasswordSwitch = (props) => (
   <div>
      <label class="form-switch">
         <input type="checkbox" 
            {...props}
         />
         <i class="form-icon"></i>
         Show password
      </label>
   </div>
)

export { 
   EmailInput,
   TextInput,
   TextArea,
   NumberInput, 
   DateInput,
   PasswordInput, 
   FileInput,
   Radio,
   Label
};
