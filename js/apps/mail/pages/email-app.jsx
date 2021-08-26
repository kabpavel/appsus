import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/email-list.jsx';
// import { BookFilter } from '../cmps/BookFilter.jsx';
import { EmailDetails } from '../cmps/email-preview-span.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
// import { AddEmail } from '../cmps/add-email.jsx';
const { NavLink, withRouter } = ReactRouterDOM

 class _Email extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isOpen:false,
        writingMail:false
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
    onAddMail=()=>{
        console.log('whriting new mail');
        this.setState({writingMail:!this.state.writingMail})

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };

    onSelectEmail = (email) => {
        this.setState({ selectedEmail: email });
    };

    onDeleteEmail = (emailId) => {
        emailService.deleteEmail(emailId)
        this.onSelectEmail(null)
        this.loadEmails()
    }

    render() {
        const { isOpen,emails, selectedEmail ,writingMail} = this.state
        if (!emails.length) return <div>Loading...</div>
        return <section className="email-app">
            <nav className="email-nav-container" onClick={() => {
                    this.setState({ isOpen: !isOpen })
                }}> <div className="email-nav-icon">☰</div>
                    <div className={isOpen ? "open email-nav": "close email-nav"}>
                        <NavLink activeClassName="my-active" className="inbox block"  exact to="/email" >Inbox</NavLink>
                        <NavLink activeClassName="my-active" className="starred block" to="/email/starred" >Starred</NavLink>
                        <NavLink activeClassName="my-active" className="sent-mail block" to="/email/sent-mail" >Sent Mail</NavLink>
                        <NavLink activeClassName="my-active" className="drafts block" to="/email/drafts" >Drafts</NavLink>
                    </div>
                </nav>
                <hr className="email-hr" />
            <React.Fragment>
                {/* <AddEmail/> */}
                {/* <EmailFilter onSetFilter={this.onSetFilter} /> */}
              
                <EmailList emails={emails} onSelectEmail={this.onSelectEmail} onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail}  />
            </React.Fragment>
            {/* {selectedEmail && <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} />} */}
            <button className="new-mail-create-btn" onClick={this.onAddMail}><img  src="assets/new-mail-create.png" alt="writing-email" /></button>
            {writingMail&&<EmailCompose emails={emails} onWritingMail={this.onAddMail}/>}
        </section>
    }
}

export const Email = withRouter(_Email)