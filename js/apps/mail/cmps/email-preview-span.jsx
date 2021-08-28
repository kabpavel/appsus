import { emailService } from "../services/email.service"
import { EmailCompose } from "./email-compose.jsx";

export class EmailDetails extends React.Component {
    state = {
        hover: '',
        isDraft: false,
        writingMail: false
    }
    setHover = (trash) => {
        this.setState({ hover: trash });
    };
    onIsDraft = () => {
        this.setState({ isDraft: true })
        this.onAddMail()
    }
    onAddMail = () => {
        console.log('whriting new mail');
        this.setState({ writingMail: !this.state.writingMail })
    }
    
    onBack = () => {
        this.props.history.push('/email')
    }

    render() {

        const { email, onDeleteEmail, onBack } = this.props
        const { hover, writingMail, isDraft } = this.state
        return <section className="detailes-container">
            <div className="detailes-title-container">
                <h4 className="email-details-title">{email.subject}</h4>
                <div>

                    <button onClick={() => {
                        onDeleteEmail(email.id)
                        onBack()

                    }}
                        onMouseEnter={() => this.setHover('trash-open')}
                        onMouseLeave={() => this.setHover('')}
                    ><img src={hover === 'trash-open' ? 'assets/deleteOpen.png' : "assets/delete.png"} alt="" /></button>
                    <button className="email-response" onClick={() => {
                        this.onIsDraft()
                    }}>⮫</button>
                </div>
            </div>
            {writingMail && <EmailCompose email={email} onWritingMail={this.onAddMail} isDraft={isDraft} />}
            <h4 className="email-details-name"> <span>{email.name}</span> {'<' + email.emailAddress + '>'}</h4>
            <h4 className="email-details-content"> {email.body}</h4>
            <div className="email-clock">
                {/* <Clock /> */}
            </div>
            <hr className="email-hr" />
            {/* <h4>content - {email.content}</h4> */}
        </section>
    }
}