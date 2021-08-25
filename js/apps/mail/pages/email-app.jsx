import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/email-list.jsx';
// import { BookFilter } from '../cmps/BookFilter.jsx';
import { EmailDetails } from '../cmps/email-details.jsx';
// import { AddEmail } from '../cmps/add-email.jsx';
const { NavLink, withRouter } = ReactRouterDOM

 class _Email extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isOpen:false
    }
    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy).then((emails) => {
            console.log('emails', emails);
            this.setState({ emails });

        });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };

    onSelectEmail = (email) => {
        this.setState({ selectedEmail: email });
    };

    onDeleteEmail = (emailId) => {
        bookService.deleteEmail(emailId)
        this.onSelectEmail(null)
        this.loadEmails()
    }

    render() {
        const { isOpen,emails, selectedEmail } = this.state
        if (!emails.length) return <div>Loading...</div>
        return <section className="email-app">

            <nav onClick={() => {
                    this.setState({ isOpen: !isOpen })
                }}>  ☰
                    <div className="email-nav-container">
                        <NavLink activeClassName="my-active" className={isOpen ? "open inbox" : "close inbox"} exact to="/email" >Inbox</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open starred" : "close starred"} to="/email/starred" >Starred</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open sent-mail" : "close sent-mail"} to="/sent-mail" >Sent Mail</NavLink>
                        <NavLink activeClassName="my-active" className={isOpen ? "open drafts" : "close drafts"} to="/email/drafts" >Drafts</NavLink>
                    </div>
                </nav>
            <React.Fragment>
                {/* <AddEmail/> */}
                {/* <EmailFilter onSetFilter={this.onSetFilter} /> */}
                <EmailList emails={emails} onSelectEmail={this.onSelectEmail} />
            </React.Fragment>
            {/* {selectedEmail && <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} />} */}
        </section>
    }
}

export const Email = withRouter(_Email)