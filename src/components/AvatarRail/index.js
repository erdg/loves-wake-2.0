import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { Menu, MenuItem, MenuHeader, MenuDivider } from '../menu';
import { Avatar } from '../avatar';

const AvatarRail = (props) => {
   return (
      <Menu style="z-index:1;background:rgba(255,255,255,0.9);">

         <figure class="avatar avatar-xxl centered mt-2" data-initial={props.firstName.charAt[0]}>
            <img src={props.avatar} />
         </figure>

         <MenuItem>
            <h4 class="text-center m-2">{props.firstName}</h4>
         </MenuItem>

         <MenuDivider></MenuDivider>

         <MenuItem>
            <Link activeClass="active" 
               href={"/" + props.urlStr + "/" + props.urlNm + "/shrine"} >Shrine</Link>
         </MenuItem>

         <MenuItem>
            <Link activeClass="active" 
               href={"/" + props.urlStr + "/" + props.urlNm + "/chronicle"}>Chronicle</Link>
         </MenuItem>

         <MenuItem>
            <Link activeClass="active" 
               href={"/" + props.urlStr + "/" + props.urlNm + "/atlas"}>Atlas</Link>
         </MenuItem>

      </Menu>
   )
}

export default AvatarRail;
