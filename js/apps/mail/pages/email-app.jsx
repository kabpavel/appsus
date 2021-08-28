import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/email-list.jsx';
// import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailDetails } from '../cmps/email-preview-span.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
import { EmailFilter } from '../cmps/email-filter.jsx';
// import { AddEmail } from '../cmps/add-email.jsx';
const { NavLink, withRouter, Route, Router } = ReactRouterDOM

class _Email extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isOpen: false,
        writingMail: false
    }
    componentDidMount() {
        this.loadEmails();
        console.log("Email app, props", this.props);
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        for (const { key, val } of urlSrcPrm) {
            console.log('key:', key)
            console.log('val:', val)

        }
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy).then((emails) => {
            console.log('emails', emails);
            this.setState({ emails });

        });
    };
    onAddMail = () => {
        console.log('whriting new mail');
        this.setState({ writingMail: !this.state.writingMail })
    }

    filterByPath = () => {
        const str = this.props.location.pathname.split('/')
        console.log("we are in")
        if (str.length >= 2) {
            this.setState({ filterBy: str[2] })
            this.loadEmails()
        }
        else if (str[1] === 'email') {
            return Promise.resolve(() => {

                console.log("fuck it is hard")
                console.log("filterBy", this.state.filterBy)
                this.setState({ filterBy: null })
                this.loadEmails()
            })

        }
        console.log("filterBy************", str)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };

    onSelectEmail = (email) => {
        this.setState({ selectedEmail: email });
    };

    onDeleteEmail = (emailId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                emailService.deleteEmail(emailId)
                this.onSelectEmail(null)
                this.loadEmails()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
}


render() {
    const { isOpen, emails, selectedEmail, writingMail } = this.state
    if (!emails.length) return <div>Loading...</div>
    return <section className="email-app">
        <div className="email-nav-icon" onClick={() => {
            this.setState({ isOpen: !isOpen })
        }}>☰</div>
        <div className="content-mail-container">
            <nav className={isOpen ? "open email-nav-container" : "close email-nav-container"} onClick={() => {
                this.filterByPath()
            }}>
                <button className="desctop-compose-btn" onClick={this.onAddMail}><span>+</span> Compose</button>
                <div className="email-nav" >
                    <NavLink activeClassName="my-active" className="inbox block" exact to="/email" >📥 Inbox</NavLink>
                    <NavLink activeClassName="my-active" className="starred block" to="/email/starred" ><span>✭</span> Starred</NavLink>
                    <NavLink activeClassName="my-active" className="sent-mail block" to="/email/sent-mail" > ➦ Sent Mail</NavLink>
                    <NavLink activeClassName="my-active" className="drafts block" to="/email/drafts" >📄 Drafts</NavLink>
                    <hr />
                </div>
            </nav>
            <hr className="email-hr" />
            <div className="react-fregment">
                {/* <AddEmail/> */}
                <EmailFilter onSetFilter={this.onSetFilter} />

                <EmailList emails={emails} onSelectEmail={this.onSelectEmail} onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} />
            </div>
        </div>
        {/* {selectedEmail && <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} />} */}
        <button className="new-mail-create-btn" onClick={this.onAddMail}><img src="assets/new-mail-create.png" alt="writing-email" /></button>
        {writingMail && <EmailCompose  onWritingMail={this.onAddMail} />}
    </section>
}
}

export const Email = withRouter(_Email)