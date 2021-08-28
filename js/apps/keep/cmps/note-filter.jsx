export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            name: '',
        },
    };
    
    handleChange = (ev) => {
        const field = ev.target.name;
        const value =
            ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            console.log('this.state.filterBy', this.state.filterBy);
            this.props.onSetFilter(this.state.filterBy)
        });
    };

    onFilter = (ev) => {
        ev.preventDefault();
        console.log(this.state.filterBy);
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        const { name } = this.state.filterBy;
        return (
            <div></div>
        );
    }

}