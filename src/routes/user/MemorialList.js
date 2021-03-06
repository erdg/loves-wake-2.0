import { h, Component } from 'preact';
import { route, Link } from 'preact-router';

import style from './style.css';

const MemorialList = (props) => (
   <div>
      <div class="row">
         <h3 class="col">Memorials</h3>
         <button class="col btn btn-primary"
            onClick={() => route("/create-shrine")}
         > Start a New Memorial
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
         { props.memorials[0] ?
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
               :
            <div class="empty" style="width:100%;">
               <div class="empty-title">
                  You have not created any memorials
               </div>
               <div class="empty-action">
                  <button class="btn btn-primary"
                     onClick={() => route("/create-shrine")}
                  > Start a New Memorial
                  </button>
               </div>
            </div>
         }
      </div>
   </div>
)

const MemorialTile = (props) => (
   <div class="card m-2 p-2" style="flex-wrap:wrap;">
      <div class="card-body">
         <img class="img-responsive" src={props.avatar} />
            <p class="card-title col h5">{props.nm}</p>
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
