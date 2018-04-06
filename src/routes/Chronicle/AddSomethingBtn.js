import style from './style';

const AddSomethingBtn = (props) => (
   <div class={"dropdown d-block "  + style.AddSomething}>
      <button 
         class="circle btn btn-primary float-right tooltip tooltip-left dropdown-toggle"
         tab-index="0"
         data-tooltip="Add Something"
      >
         <i class="icon icon-plus" />
      </button>
      <ul class="menu d-block"
         style="top:40px;left:unset;right:0px;"
      >
         <li class="menu-item">
            <a onClick={props.showModal}>Visual Artifact</a>
         </li>
         <li class="menu-item">
            <a onClick={props.showWrittenModal}>Written Artifact</a>
         </li>
      </ul>
   </div>
)

export default AddSomethingBtn;
