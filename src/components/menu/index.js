
const Menu = (props) => {
   return (
      <ul class={"menu " + props.class}>
         {props.children}
      </ul>
   )
}

const MenuItem = (props) => {
   return (
      <li class={"menu-item " + props.class }>
         {props.children}
      </li>
   )
}

const MenuHeader = (props) => {
   return (
      <li class="divider" data-content={props.children}></li>
   )
}

const MenuDivider = (props) => {
   return (
      <li class="divider" data-content={props.children}></li>
   )
}


export { 
   Menu, 
   MenuItem, 
   MenuHeader,
   MenuDivider
}
