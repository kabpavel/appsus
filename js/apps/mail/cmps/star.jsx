import { eventBusService } from '../services/event-bus-service.js';


export class Star extends React.Component {
  state = {
    starred: false,
  };

  setStar = (ev) => {
    const { starred } = this.state
    const { onStarChange } = this.props;
    onStarChange();
    this.setState({ starred: !starred })
  };

  render() {
    const { starred } = this.state
    const { isStarOn } = this.props
    return (
      <button className="star-btn" onClick={(event) => {
        this.setStar(event)
      }}>
        <span className={starred||isStarOn ? "star on" : "star off"}>&#9733;</span>
      </button>

    )
  }
}
