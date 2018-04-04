import { h, Component } from 'preact';
import { route } from 'preact-router';

const MemorialList = (props) => (
   <div>
      <h3>Memorials</h3>
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
)

const MemorialTile = (props) => (
   <div class="tile" style="max-width: 500px;">
      <div class="tile-icon">
         <figure class="avatar avatar-lg"> 
            <img src={props.avatar} />
         </figure>
      </div>
      <div class="tile-content">
         <p class="tile-title">{props.nm}</p>
         <p class="tile-subtitle text-gray">
            {props.born} - {props.died}
         </p>
      </div>
      <div class="tile-action">
         <button 
            class="btn"
            onClick={() => route("/user/manage-memorial/" + props.urlNm)}
         > 
            Manage content
         </button>
         <button 
            class="btn"
            onClick={() => route("/" + props.urlStr + "/" + props.urlNm + "/chronicle")}
         > 
            View Chronicle
         </button>
      </div>
   </div>
)

export default MemorialList;
