const FlexContainer = (props) => {
   var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;
   return (
      <div class="flex-container">
         <div class="left-rail hide-sm" />
         <div class="left-gutter hide-md" />
         {/* hide avatar rail on small screens when there's no content */}
         <div class={ width < 800 && !props.avatarRail ? "d-none" : "avatar-rail"} >
            {props.avatarRail}
         </div>
         <div class="form-rail">
            {props.formRail}
         </div>
         <div class="dialog-rail hide-md">
            {props.dialogRail}
         </div>
         <div class="right-gutter hide-md" />
      </div>
   );
};

export { FlexContainer };
