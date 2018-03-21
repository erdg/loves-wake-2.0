import { h, Component } from 'preact';
import './linked-ref';
import vis from './vis-timeline-graph2d.min.js';
import '../../style/vis-timeline-graph2d.min.css';
import '../../style/timeline.css';

export default class TimeLine extends Component {

   componentDidMount() {
      let born = this.props.born;

      this.timelineDataSet = new vis.DataSet();

      this.timeline = new vis.Timeline(this.refs.timeline, this.timelineDataSet, {
         //options
         // NOTE - start/min of timeline set dynamically below, after data has loaded
         max: '2025',
         end: '2020',

         height: '160px',

         // clickable stuff
         selectable: true,
         // editable: true,

         // stack: false,
         type: 'point',
         // one year
         // zoomMin: 31557600000,
         // // fifty years
         // zoomMax: 1577880000000
      });

      // 'properties' not to be confused with 'props'
      this.timeline.on('select', (properties) => {
         console.log(properties.items[0]);
         if (!properties.items[0]) { return };
         this.props.changeItem(properties.items[0]);
      });
   }

   addItem = (item) => {
      this.timelineDataSet.add(item);
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
      // dynamic timeline start date (birth)
      this.timeline.setOptions({ 
         min: this.props.born,
      });
      // add data set
      this.timelineDataSet.add(this.props.data);
      // focus timeline on current item
      this.selectItem(this.props.data[0]);
      this.timeline.redraw();
   }

   render (props) {
      return (
         <div 
            ref={ this.linkRef('timeline') } 
         />
      )
   }
}


