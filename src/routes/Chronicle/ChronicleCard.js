import { h, Component } from 'preact';
import style from './style';
import marked from 'marked';

const ChronicleCard = (props) => (

   <div 
      class={props.stylesheet ? "panel " + style.ChronicleCard : "panel"}
      style={props.style ? "min-height:400px;" : ""}
   >

      <div class="panel-body my-2">

         {/* if markdown, render. else, render as polaroid style card */}
         { props.txt ?
            <div dangerouslySetInnerHTML={{__html: marked(props.txt.split("^J^J").join("\n"))}} />
               :
            <div>
               { props.src &&
                  <img 
                     src={props.src} 
                     alt={props.title} 
                     class="img-responsive centered my-2"
                     style="max-height:400px;"
                  />
               }
               <h4>{props.title}</h4>
               <div class="d-inline">{props.location}</div> 
               <div class="d-inline mx-2">{props.date}</div>
            </div>
         }
      </div>

      {/*
      <div class="card-footer">
         <button class="btn btn-primary">Do</button>
      </div>
      */}

   </div>
)

export default ChronicleCard;
