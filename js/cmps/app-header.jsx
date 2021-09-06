import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"
import { GenericFilter } from "./generic-filter.jsx"

const { NavLink, withRouter } = ReactRouterDOM


class _AppHeader extends React.Component {
    state = {
        isOpen: false,
        content: '',
        setFilterBy: ''

    }


    render() {

        const { isOpen,setFilterBy } = this.state
        return (
            <section className="app-header">
                <div className="one">
                    <h1 className="head-line" onClick={() => this.props.history.goBack()}>Appsus</h1>
                </div>

                {/* <p>Cars Count: {this.state.carsCount}</p> */}
                <nav onClick={() => {
                    this.setState({ isOpen: !isOpen })
                }}>  <img className="header-icon" src="assets/SI03Q.png" alt="" />
                    <GenericFilter filter={setFilterBy} />
                    <div className={isOpen ? "open nav-container" : "close nav-container"}>
                        <NavLink activeClassName="my-active" className={isOpen ? "open home" : "close home"} exact to="/" ><img src="assets/home.png" alt="" /></NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open email" : "close email"} to="/email" onClick={() => {
                            console.log('email')
                            this.setState({ setFilterBy: 'email' })
                        }}><img src="assets/email.png" alt="" /></NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open keep" : "close keep"} to="/note-app" onClick={() => {
                            this.setState({ setFilterBy: 'note-app' })
                        }} ><img src="assets/notes.png" alt="" /></NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open book" : "close book"} to="/miss-book/" onClick={() => {
                            this.setState({ setFilterBy: 'miss-book' })
                        }}><img src="assets/books.png" alt="" /></NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open about" : "close about"} to="/about" onClick={() => {
                            this.setState({ setFilterBy: 'about' })
                        }}><img src="assets/about-us.png" alt="" /></NavLink>
                    </div>
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)