export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false,
        shownTxt: '',
        readLess: false
    }
    componentDidMount() {
        const { text } = this.props
        if (text.length < 50) {
            this.setState({ isLongTxtShown: true })
            this.setState({ shownTxt: text })
        }
        else {
            this.setState({ shownTxt: text.substr(1, 50) });
        }
    }

    onToggle = (ev) => {
        const { text } = this.props
        if (!this.state.readLess) {
            this.setState({ readLess: true })
            this.setState({ shownTxt: text });
        }
        else {
            this.setState({ readLess: false })
            this.setState({ shownTxt: text.substr(1, 100) });
        }
    }
    render() {
        const { text } = this.props
        const { isLongTxtShown, readLess, shownTxt } = this.state
        return (
            <section className="description">
                {shownTxt}
                {/* {!readLess && !isLongTxtShown && <button className="read-more" onClick={(ev) => {
                    ev.stopPropagation()
                    this.onToggle(ev);
                }}>Read More</button>} */}
                {/* {readLess && !isLongTxtShown && <button className="read-less" onClick={(ev) => {
                    // ev.preventDefault()
                    ev.stopPropagation()
                    this.onToggle(ev);
                }}>Read less</button>} */}
            </section>
        );
    }
}