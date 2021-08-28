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
        this.setState({ writingMail: !this.state.writingMail })
    }

    onBack = () => {
        this.props.history.push('/email')
    }

    render() {

        const { email, onDeleteEmail, onBack,saveToDraft } = this.props
        const { hover, writingMail, isDraft } = this.state
        return <section className="detailes-container">

            <div className="detailes-title-container">
                <h4 className="email-details-title">{email.subject}</h4>
                <div className="buttons-preview-container">

                    <button onClick={() => {
                        onDeleteEmail(email.id)
                        onBack()

                    }}
                        onMouseEnter={() => this.setHover('trash-open')}
                        onMouseLeave={() => this.setHover('')}
                    ><img src={hover === 'trash-open' ? 'assets/delete.png' : "assets/delete.png"} alt="" /></button>
                    <button className="replay-arrow" onClick={() => {
                        this.onIsDraft()
                    }}>⮫</button>

                    {writingMail && <EmailCompose onWritingMail={this.onAddMail} email={email} isDraft={isDraft} saveToDraft={saveToDraft} />}
                </div>
            </div>
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