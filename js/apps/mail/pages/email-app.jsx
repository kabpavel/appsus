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
        emailsSent: [],
        emailsStarred: [],
        drafts: [],

        inbox: true,
        star: false,
        sent: false,
        draft: false,

        filterBy: null,
        selectedEmail: null,
        isOpen: false,
        writingMail: false
    }
    componentDidMount() {
        this.loadEmails();
    }

    saveToDraft = (values) => {
        this.state.drafts.push(values)
        this.setState({ drafts: this.state.drafts })
        console.log(this.state.drafts)

    }

    loadEmails = () => {
        const filter =  this.state.filterBy
        console.log('filter',filter)
        // const filter = ''
        emailService.query(filter).then((emails) => {
            this.setState({ emails });

        });



    };
    onAddMail = () => {
        this.setState({ writingMail: !this.state.writingMail })
    }

    onHandleList = (ev) => {
        const listToShow = ev.target.name
        // this.setState({[listToShow]:true})  
        this.setState({ inbox: false })
        this.setState({ star: false })
        this.setState({ sent: false })
        this.setState({ draft: false })
        this.setState(prevState => ({ ...prevState, [listToShow]: true }))
        console.log(this.state[listToShow])
        this.setState({ emailsStarred: emailService.getStarList() })

    }
    onSendMail = () => {
        const  sentMails = emailService.getSentEmails()
        this.setState({emailsSent:sentMails})

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
        const { isOpen, emails, emailsSent, emailsStarred, drafts, writingMail, filterBy, inbox, star, sent, draft } = this.state
        if (!emails.length && (!filterBy)) return <div>Loading...</div>

        console.log('emailsStarred', emailsStarred)
        return <section className="email-app">
                      <EmailFilter onSetFilter={this.onSetFilter} />
            <div className="email-nav-icon" onClick={() => {
                this.setState({ isOpen: !isOpen })
            }}>☰</div>
            <div className="content-mail-container">
                <nav className={isOpen ? "open email-nav-container" : "close email-nav-container"} >
                    <button className="desctop-compose-btn" onClick={this.onAddMail}><span>+</span> Compose</button>
                    <div className="email-nav" >
                        <button className="inbox block btn" name="inbox" onClick={(ev) => {
                            this.onHandleList(ev)
                        }
                        }>📥 Inbox</button>
                        <button className="starred block btn" name="star" onClick={(ev) => {
                            this.onHandleList(ev)
                        }
                        }><span>✭</span> Starred</button>
                        <button className="sent-mail block btn" name="sent" onClick={(ev) => {
                            this.onHandleList(ev)
                        }
                        }> ➦ Sent Mail</button>
                        <button className="drafts block btn" name="draft" onClick={(ev) => {
                            this.onHandleList(ev)
                        }
                        }>📄 Drafts</button>

                        {/* <NavLink activeClassName="my-active" className="inbox block" to={`email/inbox`} >📥 Inbox</NavLink>
                        <NavLink activeClassName="my-active" className="starred block" to={`/email/star`} ><span>✭</span> Starred</NavLink>
                        <NavLink activeClassName="my-active" className="sent-mail block" to="/email/sent-mail" > ➦ Sent Mail</NavLink>
                        <NavLink activeClassName="my-active" className="drafts block" to="/email/drafts" >📄 Drafts</NavLink> */}
                        <hr />
                    </div>
                </nav>
                <hr className="email-hr" />
                <div className="react-fregment">
                    {/* <AddEmail/> */}

                    
                    {inbox && <EmailList emails={emails} onSelectEmail={this.onSelectEmail}
                        onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} saveToDraft={this.saveToDraft} />}
                    {star && <EmailList emails={emailsStarred} onSelectEmail={this.onSelectEmail}
                        onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} saveToDraft={this.saveToDraft} />}
                    {sent && <EmailList emails={emailsSent} onSelectEmail={this.onSelectEmail}
                        onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} saveToDraft={this.saveToDraft} />}
                    {draft && <EmailList emails={drafts} onSelectEmail={this.onSelectEmail}
                        onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} />}
                </div>
            </div>
            {/* {selectedEmail && <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} />} */}
            <button className="new-mail-create-btn" onClick={this.onAddMail}><img src="assets/new-mail-create.png" alt="writing-email" /></button>
            {writingMail && <EmailCompose onWritingMail={this.onAddMail} saveToDraft={this.saveToDraft} onSendMail={this.onSendMail} />}
        </section>
    }
}

export const Email = withRouter(_Email)