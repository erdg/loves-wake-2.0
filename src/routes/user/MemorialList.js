import { h, Component } from 'preact';
import { route, Link } from 'preact-router';

import style from './style.css';

const MemorialList = (props) => (
   <div>
      <div class="row">
         <h3 class="col">Memorials</h3>
         <button class="col btn btn-primary"
            onClick={() => route("/create-shrine")}
         >
            Start a New Memorial
         </button>
      </div>
      <div class="divider py-2" />
      <div
         style={
            "display:flex;"
            + "flex-direction:row;"
            + "flex-wrap:wrap;"
            + "align-items:flex-start;"
            + "justify-content:flex-start;"
         }
      >
         { 
            props.memorials.map((m) => (
               <MemorialTile 
                  urlNm={m.urlNm}
                  urlStr={m.urlStr}
                  nm={m.nm} 
                  born={m.born} 
                  died={m.died} 
                  avatar={m.avatar}
               />
            ))
         }
      </div>
   </div>
)

const MemorialTile = (props) => (
   <div class="tile tile-centered m-2 p-2" style="flex-wrap:wrap;">
      <div class="tile-icon">
         <figure class={"avatar avatar-xl " + style.tileAvatar}> 
            <img src={props.avatar} />
         </figure>
      </div>
      <div class="tile-content">
         <p class="tile-title h5">{props.nm}</p>
         <p class="tile-subtitle text-gray">
            {props.born} to {props.died}
         </p>
      </div>
      <div class="tile-action">
         <button 
            class="btn btn-sm row m-1"
            onClick={() => route("/user/manage-memorial/" + props.urlNm)}
         > 
            Manage content
         </button>
         <button 
            class="btn btn-sm row m-1"
            onClick={() => route("/" + props.urlStr + "/" + props.urlNm + "/chronicle")}
         > 
            View chronicle
         </button>
      </div>
   </div>
)

export default MemorialList;
