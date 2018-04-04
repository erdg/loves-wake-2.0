import { h, Component } from 'preact';
import { route } from 'preact-router';
import API_ENDPOINT from '../../api';

// This is a HOC that handles login details.
//
// USAGE - attach to a page that requires being
// logged in to access, e.g.
//
//    UserProfileWithAuth = withAuth(UserProfile);
//
// If user is not logged in, they will be redirected
// to the login page.
const withAuth = ComposedComponent =>
   class extends Component {
      state = {
         loading: true
      }

      componentDidMount () {
         let loginToken = window.sessionStorage.getItem("loginToken");
         // if no token, route to login page
         if (!loginToken) {
            alert('You need to login to access this page.');
            route("/login");
            return;
         }

         // fetch user data if needed
         if (!this.props.user.email) {
            fetch(API_ENDPOINT + "!getUserData",
               {
                  method: "POST",
                  body: JSON.stringify({ loginToken: loginToken })
               }
            )
               .then(res => {
                  // if token has expired, route to login page
                  if (!res.ok) {
                     alert('You need to login to access this page.');
                     route("/login");
                     return;
                  } else {
                     this.setState((prevState) => {
                        return { loading: !prevState.loading };
                     })
                     return res.json();
                  }
               })
               .then(json => {
                  this.props.setUserData(json.user);
               });
         } else {
            this.setState((prevState) => {
               return { loading: !prevState.loading };
            })
         }

      }

      render () {
         if (this.state.loading) {
            return (
               <div class="centered loading loading-xl" />
            );
         } else {
            return (<ComposedComponent user={this.props.user} urlNm={this.props.urlNm} />);
         }
      }
   }

export default withAuth;
