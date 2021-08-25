
const { NavLink, withRouter } = ReactRouterDOM


class _AppHeader extends React.Component {
    state = {
        isOpen: false,
        content: ''

    }
    render() {

        const { isOpen } = this.state
        return (
            <section className="app-header">
                <div className="one">
                    <h1 className="head-line" onClick={() => this.props.history.goBack()}>Appsus</h1>
                </div>
                {/* <p>Cars Count: {this.state.carsCount}</p> */}
                <nav onClick={() => {
                    this.setState({ isOpen: !isOpen })
                }}> ☰
                    <NavLink activeClassName="my-active" className={isOpen ? "open" : "close"} exact to="/" >Home</NavLink>
                    <NavLink activeClassName="my-active" className={isOpen ? "open" : "close"} to="/email" >Email</NavLink>
                    <NavLink activeClassName="my-active" className={isOpen ? "open" : "close"} to="/keep-note" >keep</NavLink>
                    <NavLink activeClassName="my-active" className={isOpen ? "open" : "close"} to="/miss-book" >Books</NavLink>
                    <NavLink activeClassName="my-active" className={isOpen ? "open" : "close"} to="/about" >About</NavLink>
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)