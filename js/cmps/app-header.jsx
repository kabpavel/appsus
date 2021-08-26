
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
                }}>  <img className="header-icon" src="assets/SI03Q.png" alt="" />

                    <div className={isOpen ? "open nav-container":"close nav-container"}>
                        <NavLink activeClassName="my-active" className={isOpen ? "open home" : "close home"} exact to="/" >Home</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open email" : "close email"} to="/email" >Email</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open keep" : "close keep"} to="/note-app" >keep</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open book" : "close book"} to="/miss-book" >Books</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open about" : "close about"} to="/about" >About</NavLink>
                    </div>
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)