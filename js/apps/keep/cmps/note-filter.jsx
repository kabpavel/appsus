export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            type: '',
            text: ''
        },
    };

    handleChange = (ev) => {
        //debugger
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            console.log('this.state.filterBy', this.state.filterBy);
            this.props.onSetFilter(this.state.filterBy)
        });
    };

    onFilter = (ev) => {
        //debugger
        ev.preventDefault();
        console.log(this.state.filterBy);
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        const { name } = this.state.filterBy;

        return (
            <div className="note-filter-container">
                <div className="note-filter">
                {/* <label for="note-type">Note type</label> */}
                <select name="type" id="type" onChange={this.handleChange}>
                    <option value="">All</option>
                    <option value="note-txt">Text</option>
                    <option value="note-todos">Todos</option>
                    <option value="note-img">Image</option>
                    <option value="note-video">Video</option>
                </select>
                </div>
            </div>
        );
    }
}