import { eventBusService } from '../services/event-bus-service.js';


export class Star extends React.Component {
  state = {
    starred: false,
  };

  setStar = (ev) => {
    const {starred} = this.state
    // console.log("ev",ev);
    // ev.stopPropagation()
    const { onStarChange } = this.props;
    onStarChange();
    this.setState({ starred: !starred })
  };

  render() {
    const { starred } = this.state
    return (
      <button className="star-btn" onClick={(event) => {
        this.setStar(event)
      }}>
        <span className={starred ? "star on" : "star off"}>&#9733;</span>
      </button>

    )
  }
}
