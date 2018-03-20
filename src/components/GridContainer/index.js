import style from './style';

const GridContainer = (props) => (
   <div class={style.gridContainer}>
      <div class={style.avatarColumn}>
         {props.avatarColumn}
      </div>
      <div class={style.contentColumn}>
         {props.contentColumn}
      </div>
   </div>
);

export default GridContainer;
