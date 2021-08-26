
export class EmailFilter extends React.Component {
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
            <form className='email-filter' onSubmit={this.onFilter}>
                <label htmlFor='by-name'>By Name</label>
                <input
                    name='name'
                    id='by-name'
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={this.handleChange}
                />
                <button>Filter</button>
            </form>
        );
    }

}