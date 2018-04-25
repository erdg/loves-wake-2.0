import { h, Component } from 'preact';
import { route } from 'preact-router';

const ContentList = (props) => (
   <div>
      <div class="row">
         <h4 class="col">Chronicle Items</h4>
         <div class="col" />
         <button
            class="col btn btn-primary"
            onClick={props.newItem}
         >
            Add Item
         </button>
      </div>
      <div class="divider" />
      <div
         style={
            "display:flex;"
            + "flex-direction:row;"
            + "flex-wrap:wrap;"
            + "align-items:flex-start;"
            + "justify-content:center;"
         }
      >
         { 
            props.items.map((item) => (
                  <ContentCard
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
   </div>
)

const ContentCard = (props) => (
   <div class="card m-2" style={"width:200px;" + (props.edited ? "background:lightcoral;" : "")}>
      { props.src &&
            <img class="responsive-img mt-2 mx-2 centered" src={props.src} style="max-width:182px"/>
      }
      <div class="card-body">
         <div class="h6 text-ellipsis">{props.title}</div>
         <div class="text-gray text-ellipsis" style="font-size:smaller;">{props.location}</div>
         <div class="text-gray" style="font-size:smaller;">{props.date}</div>
      </div>
      <div class="card-footer">
         <button 
            class="btn btn-sm float-right"
            onClick={(id) => props.showModal(props.id)}
         > 
            edit
         </button>
      </div>
   </div>
)

export default ContentList;
