import { h, Component } from 'preact';
import style from './style';

const ChronicleCard = (props) => (

   <div 
      class={props.stylesheet ? "panel " + style.ChronicleCard : "panel"}
      style={props.style ? "min-height:400px;" : ""}
   >

      <div class="panel-body mt-2">

         {/* no need to render image if it doesn't exist */}
         { props.src &&
            <img 
               src={props.src} 
               alt={props.title} 
               class="img-responsive my-2"
            />
         }

         <h4>{props.title}</h4>

         <div class="text-gray d-inline">{props.location}</div> 
         <div class="text-gray d-inline mx-2">{props.date}</div>

         <p>{props.caption}</p>

      </div>

      {/*
      <div class="card-footer">
         <button class="btn btn-primary">Do</button>
      </div>
      */}

   </div>
)

export default ChronicleCard;
