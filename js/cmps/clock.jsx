
export class Clock extends React.Component {
    state = {
        time: new Date()
    };
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ time: new Date() })
        }, 1000);
        // const month = new Date().getMonth() + 1;
        // const newSeason = this.getSeason(month);
        // this.setState({ season: newSeason });
    }
    render() {
        const { time } = this.state
        const hour = time.getHours() > 10 ? time.getHours() : '0' + time.getHours();
        const minutes = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes();

        return <div className="clock-container">
            {hour+':'+minutes}
        </div>
    }
}