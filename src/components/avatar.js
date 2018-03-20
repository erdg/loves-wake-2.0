// import classNames from 'classnames';

const Avatar = (props) => (
   <figure 
      class={ props.class ? "avatar " + props.class : "avatar" } 
      data-initial={props.data}
   >
      <img src={props.src} />
   </figure>
)

export { Avatar };
