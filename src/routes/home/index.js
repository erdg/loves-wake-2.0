import { h, Component } from 'preact';
// import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1 class="text-center">Love's Wake</h1>
            <img 
               class="img-responsive centered"
               src="../../assets/loves-wake-logo.png" 
               alt="Love's Wake Logo" 
            />
			</div>
		);
	}
}
