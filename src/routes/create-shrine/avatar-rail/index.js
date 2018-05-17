import { h, Component } from 'preact';

import { Menu, MenuItem, MenuHeader, MenuDivider } from '../../../components/menu/';

const AvatarRail = (props) => {
   let initials = props.firstName.charAt(0) + props.lastName.charAt(0);
   return (
      <Menu class="avatar-rail-menu" >
         { 
            props.step > 1 && 
               <figure class="avatar avatar-xxl centered" data={ initials }>
                  <img src={props.src} />
               </figure>
         }
         {
            props.step > 1 &&
               <MenuItem>
                  <h4 class="text-center m-2">{props.firstName}</h4>
               </MenuItem>
         }
         <div class={ props.step <= 3 ? "" : "hide-sm" } >
            <MenuDivider>Shrine Basics</MenuDivider>

            <MenuItem 
               class={ props.step === 1 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link"
                  onClick={(n) => props.gotoStep(1)}
               >
                  Name
               </a>
            </MenuItem>

            <MenuItem 
               class={ props.step === 2 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link"
                  onClick={(n) => props.gotoStep(2)}
               >
                  Photo
               </a>
            </MenuItem>

            <MenuItem 
               class={ props.step === 3 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link" onClick={(n) => props.gotoStep(3)}>Information</a>
            </MenuItem>

         </div>

         <div class={ props.step > 3 ? "" : "hide-sm" } >

            <MenuDivider>Invite Others</MenuDivider>

            <MenuItem 
               class={ props.step === 4 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link"
                  onClick={() => {
                     props.gotoStep(4)
                  }}
               >Invitation Template
               </a>
            </MenuItem>

            <MenuItem 
               class={ props.step === 5 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link"
                  onClick={() => {
                     props.gotoStep(5)
                  }}
               >Customize Invitation
               </a>
            </MenuItem>

            <MenuItem 
               class={ props.step === 6 && "arrow-box" }
            >
               <a class="btn btn-sm btn-link" onClick={(n) => props.gotoStep(6)}>Invite Collaborators</a>
            </MenuItem>

         </div>

      </Menu>
   )
}

export { AvatarRail };
