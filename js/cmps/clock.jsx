
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
        let hour = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
        let minutes = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
        let amPm ='AM' 
        if(hour>12){
            hour-=12
            amPm='PM'
        }

        return <div className="clock-container">
            {hour+':'+minutes+' '+amPm}
        </div>
    }
}