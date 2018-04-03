import { h, Component } from 'preact';

const EditCard = (props) => (

   <div class={ "panel" }>

      <div class="panel-body mt-2">

         {/* no need to render image if it doesn't exist */}
         { props.item.src &&
            <img 
               src={props.item.src} 
               alt={props.item.title} 
               class="img-responsive my-2"
            />
         }

         <h4>{props.item.title}</h4>

         <div class="text-gray d-inline">{props.item.location}</div> 
         <div class="text-gray d-inline mx-2">{props.item.start}</div>

         <p>{props.item.caption}</p>

      </div>

      {/*
      <div class="card-footer">
         <button class="btn btn-primary">Do</button>
      </div>
      */}

   </div>
)

export default EditCard;
