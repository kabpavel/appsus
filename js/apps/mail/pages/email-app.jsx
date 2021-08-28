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
        drafts:[],
        isDrafts:false,
        emails: [],
        filterBy: null,
        parm: null,
        selectedEmail: null,
        isOpen: false,
        writingMail: false
    }
    componentDidMount() {
        this.loadEmails();
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        for (const { key, val } of urlSrcPrm) {


        }
    }

    saveToDraft=(values)=>{
        this.state.drafts.push(values)
        this.setState({drafts:this.state.drafts})
        console.log(this.state.drafts)
    
    }

    loadEmails = () => {
        const filter={name:this.state.filterBy,parm:this.state.parm}
        // const filter = ''
        emailService.query(filter).then((emails) => {
            this.setState({ emails });

        });
    };
    onAddMail = () => {
        this.setState({ writingMail: !this.state.writingMail })
    }

    filterByPath = () => {
        const str = this.props.location.pathname.split('/')
        if (str.length > 2) {
            this.setState({ parm: str[2] })
            if(this.state.parm==='drafts')
            this.setState({isDrafts:true})
            else{
                this.setState({isDrafts:false})
            }
            this.loadEmails()
        }
        else {
            this.setState({ parm: null })
            this.loadEmails()
        }
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
        const { isOpen, emails, selectedEmail, writingMail, parm ,isDrafts,drafts} = this.state
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
                        <NavLink activeClassName="my-active" className="starred block" to="/email/star" ><span>✭</span> Starred</NavLink>
                        <NavLink activeClassName="my-active" className="sent-mail block" to="/email/sent-mail" > ➦ Sent Mail</NavLink>
                        <NavLink activeClassName="my-active" className="drafts block" to="/email/drafts" >📄 Drafts</NavLink>
                        <hr />
                    </div>
                </nav>
                <hr className="email-hr" />
                <div className="react-fregment">
                    {/* <AddEmail/> */}
                    <EmailFilter onSetFilter={this.onSetFilter} parm={parm} />

                    {!isDrafts&&<EmailList emails={emails} onSelectEmail={this.onSelectEmail} 
                    onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} saveToDraft={this.saveToDraft} />}
                    {isDrafts&&<EmailList emails={drafts} onSelectEmail={this.onSelectEmail} 
                    onBack={() => this.onSelectEmail(null)} onDeleteEmail={this.onDeleteEmail} />}
                </div>
            </div>
            {/* {selectedEmail && <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} />} */}
            <button className="new-mail-create-btn" onClick={this.onAddMail}><img src="assets/new-mail-create.png" alt="writing-email" /></button>
            {writingMail && <EmailCompose onWritingMail={this.onAddMail} saveToDraft={this.saveToDraft}/>}
        </section>
    }
}

export const Email = withRouter(_Email)