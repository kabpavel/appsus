
export class EmailFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            emailAddress: '',
        },
        field: ''
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

    onSelect = (ev) => {
        this.setState({ field: ev.target.value })

    }

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        const { filterBy, field } = this.state
        const { name, emailAddress } = filterBy;
        return (
            <form className='email-filter' onSubmit={this.onFilter}>
                <div className="filter-input-container">
                    <label htmlFor='by-name'>By Name</label>
                    <input className="filter-input"
                        name={field}
                        id='by-name'
                        type='text'
                        placeholder='name'
                        value={filterBy[field]}
                        onChange={this.handleChange}
                    />
                    <select name="field" id="field" onChange={(ev) => {
                        this.onSelect(ev)
                    }}>
                        <option value="empty"></option>
                        <option value="name">Name</option>
                        <option value="emailAddress">Email</option>
                    </select>
                <button>Filter</button>
                </div>
            </form>
        );
    }

}