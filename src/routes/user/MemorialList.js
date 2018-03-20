import { h, Component } from 'preact';

const MemorialList = (props) => (
   <div>
      <h3>Memorials</h3>
      { 
         props.memorials.map((obj) => (
            <MemorialTile name={obj.name} born={obj.born} died={obj.died} />
         ))
      }
   </div>
)

const MemorialTile = (props) => (
   <div class="tile" style="max-width: 500px;">
      <div class="tile-icon">
         <figure class="avatar avatar-lg" />
      </div>
      <div class="tile-content">
         <p class="tile-title">{props.name}</p>
         <p class="tile-subtitle text-gray">
            {props.born} - {props.died}
         </p>
      </div>
      <div class="tile-action">
         <button class="btn"> 
            Manage content
         </button>
      </div>
   </div>
)

export default MemorialList;
