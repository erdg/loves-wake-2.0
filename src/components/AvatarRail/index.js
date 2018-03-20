import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { Menu, MenuItem, MenuHeader, MenuDivider } from '../menu';
import { Avatar } from '../avatar';

const AvatarRail = (props) => {
   return (
      <Menu>

         <Avatar class="avatar-xl centered mt-2" data-initial={props.name.charAt[0]} />

         <MenuItem>
            <h4 class="text-center m-2">{props.name}</h4>
         </MenuItem>

         <MenuDivider></MenuDivider>

         <MenuItem>
            <Link activeClass="active" href={"/" + props.name + "/shrine"}>Shrine</Link>
         </MenuItem>

         <MenuItem>
            <Link activeClass="active" href={"/" + props.name + "/chronicle"}>Chronicle</Link>
         </MenuItem>

         <MenuItem>
            <Link activeClass="active" href={"/" + props.name + "/atlas"}>Atlas</Link>
         </MenuItem>

      </Menu>
   )
}

export default AvatarRail;
