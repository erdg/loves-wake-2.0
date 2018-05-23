import { h, Component } from 'preact';
import style from './style';

class AddSomethingBtn2 extends Component {
   render (props) {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;
      return (
         <div class={"d-block " + (width > 800 ? "popover popover-bottom " : "" ) + style.AddSomething }>
            <button 
               onClick={ width < 800 ? () => document.getElementById('choose-modal').classList.add('active') : () => {}}
               class={"circle btn btn-primary float-right " + (width < 800 ? "" : "tooltip tooltip-left dropdown-toggle")}
               tab-index="0"
               data-tooltip="Add Something"
            >
               <i class="icon icon-plus" />
            </button>
            { width > 800 ?
               <div class="popover-container"
                  style="top:32px;left:unset;right:-100px;width:180px"
               >
                  <div class="card"
                  >
                     <div class="card-body"
                     >
                        <ul style="list-style:none;">
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={props.showModal}
                              > Photo <i class="material-icons float-right">photo</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={props.showModal}
                              > Video <i class="material-icons float-right">videocam</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={props.showModal}
                              > Audio <i class="material-icons float-right">audiotrack</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={props.showWrittenModal}
                              > Text <i class="material-icons float-right">email</i>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
                  :
               <div id="choose-modal" class="modal modal-sm">
                  <a onClick={() => document.getElementById('choose-modal').classList.remove('active')}
                     class="modal-overlay" 
                     aria-label="Close" 
                  />
                  <div class="modal-container">
                     <div class="modal-header">
                        <a onClick={() => document.getElementById('choose-modal').classList.remove('active')}
                           class="btn btn-clear float-right" 
                           aria-label="Close" 
                        />
                        <div class="modal-title h5">Add something</div>
                     </div>
                     <div class="modal-body">
                        <ul style="list-style:none;">
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={() => {
                                    props.showModal();
                                    document.getElementById('choose-modal').classList.remove('active');
                                 }}
                              > Photo <i class="material-icons float-right">photo</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={() => {
                                    props.showModal();
                                    document.getElementById('choose-modal').classList.remove('active');
                                 }}
                              > Video <i class="material-icons float-right">videocam</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={() => {
                                    props.showModal();
                                    document.getElementById('choose-modal').classList.remove('active');
                                 }}
                              > Audio <i class="material-icons float-right">audiotrack</i>
                              </a>
                           </li>
                           <li class="menu-item">
                              <a class="d-block c-hand"
                                 onClick={() => {
                                    props.showWrittenModal();
                                    document.getElementById('choose-modal').classList.remove('active');
                                 }}
                              > Text <i class="material-icons float-right">email</i>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            }
         </div>
      )
   }
}

export default AddSomethingBtn2;
