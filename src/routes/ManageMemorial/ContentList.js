import { h, Component } from 'preact';
import { route } from 'preact-router';

const ContentList = (props) => (
   <div>
      <h3>Items</h3>
      <button
         class="btn btn-primary"
         onClick={props.newItem}
      >
         Add Item
      </button>
      { 
         props.items.map((item) => (
            <ContentTile 
               id={item.id}
               title={item.title} 
               date={item.start} 
               location={item.location} 
               src={item.src}
               showModal={(id) => props.showModal(id)}
               edited={item.edited}
            />
         ))
      }
   </div>
)

const ContentTile = (props) => (
   <div class="tile" style={"max-width: 500px;" + (props.edited ? "background:lightcoral;" : "")}>
      <div class="tile-icon">
         <img class="responsive-img" src={props.src} style="max-width:200px"/>
      </div>
      <div class="tile-content">
         <p class="tile-title">{props.title}</p>
         <div class="tile-subtitle text-gray">{props.location}</div>
         <div class="tile-subtitle text-gray">{props.date}</div>
      </div>
      <div class="tile-action">
         <button 
            class="btn"
            onClick={(id) => props.showModal(props.id)}
         > 
            Edit item
         </button>
      </div>
   </div>
)

export default ContentList;
