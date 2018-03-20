import { h, Component } from 'preact';
import style from './style';

const ChronicleCard = (props) => (

   <div class={ "panel " + style.ChronicleCard }>

      <div class="panel-body mt-2">

         {/* no need to render image if it doesn't exist */}
         { props.currentItem.src &&
            <img 
               src={props.currentItem.src} 
               alt={props.currentItem.title} 
               class="img-responsive my-2"
            />
         }

         <h4>{props.currentItem.title}</h4>

         <div class="text-gray d-inline">{props.currentItem.location}</div> 
         <div class="text-gray d-inline mx-2">{props.currentItem.start}</div>

         <p>{props.currentItem.caption}</p>

      </div>

      {/*
      <div class="card-footer">
         <button class="btn btn-primary">Do</button>
      </div>
      */}

   </div>
)

export default ChronicleCard;
