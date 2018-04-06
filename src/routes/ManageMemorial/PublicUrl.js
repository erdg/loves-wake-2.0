import { route } from 'preact-router';

const PublicUrl = (props) => {
   return (
      <p>
         The public url for {props.nm1}'s Chronicle is
         <button 
            class="btn btn-link" 
            onClick={() => route('/' + props.urlStr + '/' + props.urlNm + '/chronicle')}
         >
            {'/' + props.urlStr + '/' + props.urlNm + '/chronicle'}
         </button>
      </p>
   )
}

export default PublicUrl;
