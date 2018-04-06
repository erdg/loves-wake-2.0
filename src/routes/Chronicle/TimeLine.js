import { h, Component } from 'preact';
import './linked-ref';
import vis from './vis-timeline-graph2d.min.js';
import '../../style/vis-timeline-graph2d.min.css';
import '../../style/timeline.css';

export default class TimeLine extends Component {
   state = {
      created: false
   }

   createTimeline = () => {
      let born = this.props.born;
      let min = (parseInt(born) - 10).toString();

      this.timelineDataSet = new vis.DataSet(this.props.data);

      this.timeline = new vis.Timeline(this.refs.timeline, this.timelineDataSet, {
         //options
         // NOTE - start/min of timeline set dynamically below, after data has loaded
         min: min,
         start: born,
         max: '2025',
         end: '2020',

         margin: {
            axis: 10,
         },

         height: '160px',

         // clickable stuff
         selectable: true,
         // editable: true,

         // stack: false,
         type: 'point',
         // one year
         zoomMin: 31557600000,
         // // fifty years
         zoomMax: 1577880000000,

         onInitialDrawComplete: () => {
            // console.log('timeline draw complete');
            this.setState((prevState) => ({ created: !prevState.created }));
            this.forceUpdate();
         }
      });

      // 'properties' not to be confused with 'props'
      this.timeline.on('select', (properties) => {
         // console.log(properties.items[0]);
         if (!properties.items[0]) { return };
         this.props.changeItem(properties.items[0]);
      });

   }

   addItem = (item) => {
      this.timelineDataSet.add(item);
      this.selectItem(item);
      this.timeline.redraw();
   }

   selectItem = (item) => {
      this.timeline.setSelection(item.id, { focus: true, animation: true });
   }

   shouldComponentUpdate (nextProps, nextState) {
      if (nextProps.data === this.props.data) {
         return false;
      }
   }

   componentDidUpdate () {
      if (!this.state.created) {
         this.createTimeline();
         // this.setState((prevState) => ({ created: !prevState.created }));
         this.selectItem(this.props.data[0]);
      }
   }

   render (props) {
      return (
         <div 
            ref={ this.linkRef('timeline') }
            class={ !this.state.created ? "loading loading-lg" : "" }
         />
      );
   }
}


