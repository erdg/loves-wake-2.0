import { route } from 'preact-router';

const PublicUrl = (props) => {
   return (
      <button 
         class="btn btn-link" 
         onClick={() => route('/' + props.urlStr + '/' + props.urlNm + '/chronicle')}
      >
         {'loveswake.com/' + props.urlStr + '/' + props.urlNm + '/chronicle'}
      </button>
   )
}

export default PublicUrl;
