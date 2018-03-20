import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
// import style from './style';

export default class Entry extends Component {
   // Note: `name` comes from the URL, courtesy of our router
   render ({ name }, {}) {
      return (
         <div>
            <h1> In Memory of { name }</h1>
            <hr />
            <ul>
               <li><Link href={ `/${name}/shrine` }>{ name }'s Shrine</Link></li>
               <li><Link href={ `/${name}/atlas` }>{ name }'s Atlas</Link></li>
               <li><Link href={ `/${name}/chronicle` }>{ name }'s Chronicle</Link></li>
            </ul>
         </div>
      );
   }
}
