import { h, Component } from 'preact';
import API_ENDPOINT from '../../api';
// import style from './style';

export default class Atlas extends Component {
   // this should be in a higher order component
   componentDidMount () {
      fetch(API_ENDPOINT + "!getMemorial?" + this.props.urlNm)
         .then(res => res.json())
         .then(json => {
            this.setState({
               nm: json.nm,
               nm1: json.nm1,
               nm2: json.nm2,
               nm3: json.nm3,
               born: json.born,
               died: json.died,
               avatar: json.avatar
            })
         })
   }

   // Note: `name` comes from the URL, courtesy of our router
   render () {
      return (
         <div>
            <h1>{ this.state.nm }'s Atlas</h1>
         </div>
      );
   }
}
