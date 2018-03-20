import { h, Component } from 'preact';
import style from './style';

export default class User extends Component {
	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, {}) {
		return (
			<div>
				<h1>User Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>
			</div>
		);
	}
}
