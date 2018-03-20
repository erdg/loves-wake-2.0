import { Component } from 'preact';

import { Dialog } from '../../components/dialog';

const EmailInput = (props) => (
   <div>
      <label class="form-label">Email</label>
      <input
         value={props.email}
         onChange={props.handleEmailChange}
         type="email"
         class="form-input" 
         placeholder="Your email"
      />
   </div>
)

class PasswordInput extends Component {

   render (props) {
      return (
         <div>

            <label class="form-label">
               Password
            </label>
            <input 
               value={ props.password }
               onChange={ props.handlePasswordChange }
               class="form-input" 
               type={ props.showPassword ? "text" : "password" }
               placeholder="Your password"
            />

            <label class="form-switch">
               <input type="checkbox" 
                  onClick={ props.toggleShowPassword } 
               />
               <i class="form-icon"></i>
               Show password
            </label>

         </div>
      )
   }
}

export { EmailInput, PasswordInput };
