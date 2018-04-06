import style from './style';

const AddSomethingBtn = (props) => (
   <button 
      class={"circle btn btn-primary float-right tooltip tooltip-left " + style.AddSomething}
      data-tooltip="Add Something"
      onClick={props.showModal}
   >
      <i class="icon icon-plus" />
   </button>
)

export default AddSomethingBtn;
