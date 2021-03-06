import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

const Header = (props) => {
   return (
      <header class="navbar m-2">
         <section class="navbar-section">
            <Link class="navbar-brand" activeClassName="active" href="/">
               <img src="../../assets/loves-wake.png" alt="Love's Wake" />
            </Link>
         </section>
         { !props.isLoggedIn ?
            <section class="navbar-section">
               <Link class="btn btn-primary" activeClassName="active" href="/create-shrine">Start a Shrine</Link>
               <Link class="btn btn-link" activeClassName="active" href="/login">Login</Link>
               <Link class="btn btn-link" activeClassName="active" href="/signup">Signup</Link>
            </section>
            :
            <section class="navbar-section">
               {/*
               <AddDropdown />
               <UserName name={props.name || props.email} style="font-size:smaller"/>
               */}
               <AvatarDropdown 
                  name={props.name || props.email} 
                  notifications={props.notifications || []}
                  img={props.img}
                  logoutUser={props.logoutUser}
               />
            </section>
         }
      </header>
   )
};

const UserName = (props) => {
   return (
      <div>{props.name}</div>
   )
}

const AvatarDropdown = (props) => {
   // let initials = props.name.split(' ')[0].charAt(0) + props.name.split(' ')[1].charAt(0);
   let initials = props.name.charAt(0);
   // number of notifications
   let notifications = props.notifications.length;
   return (
      <div class="dropdown dropdown-right mx-2">
         <a class="dropdown-toggle" tabindex="0" style="cursor:pointer;white-space:nowrap;">
            <figure 
               class="avatar avatar-lg badge mx-1" 
               data-badge={notifications === 0 ? "" : notifications.toString()}
               data-initial={initials}
            >
               <img src={props.img} />
            </figure>
            <i class="icon icon-menu" />
         </a>
         <ul class="menu">
            <li class="menu-item"><Link href="/user">Your Profile</Link></li>
            <li class="menu-item">Notifications</li>
            <li class="divider" />
            <li class="menu-item">Settings</li>
            <li class="menu-item">More Settings</li>
            <li class="divider" />
            <li class="menu-item">
               <a href="/login" 
                  onClick={() => {
                     props.logoutUser();
                  }}
               >Logout
               </a>
            </li>
         </ul>
      </div>
   )
}

const AddDropdown = (props) => (
      <div class="dropdown mx-2">
         <button class="dropdown-toggle btn btn-link" tabindex="0">
            <i class="icon icon-plus" />
            <i class="icon icon-caret" />
         </button>
         <ul class="menu">
            <li class="menu-item"><a href="/create-shrine">Start a memorial</a></li>
            <li class="divider" />
            <li>Invite others</li>
         </ul>
      </div>
)

export default Header;
