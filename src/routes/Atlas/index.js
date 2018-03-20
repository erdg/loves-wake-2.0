import { h, Component } from 'preact';
// import style from './style';

export default class Atlas extends Component {
   // Note: `name` comes from the URL, courtesy of our router
   render ({ name }, {}) {
      return (
         <div>
            <h1>{ name }'s Atlas</h1>
         </div>
      );
   }
}
