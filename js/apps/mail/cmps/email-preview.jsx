const { Link } = ReactRouterDOM

import { Clock } from '../../../cmps/clock.jsx';
import { EmailDetails } from './email-details.jsx';
// import { LongTxt } from './LongTxt.jsx'

export class EmailPreview extends React.Component {
    state = {
        selectedEmail: null
    }

    toggleChangeSelect = () => {
        const { selectedEmail } = this.state
        if(!selectedEmail){

            const { email, onSelectEmail } = this.props
            onSelectEmail(email)
            this.setState({ selectedEmail: email })
        }
        else{
            const { email, onSelectEmail } = this.props
            onSelectEmail(null)
            this.setState({ selectedEmail: null })
        }
    }
    render() {
        const { email ,onDeleteEmail} = this.props
        const { selectedEmail } = this.state
        return (
            <Link to={`/email/${email.id}`} >
                <article onClick={() => {
                    this.toggleChangeSelect()

                }} className="email-preview">
                    <h4>name - {email.name}</h4>
                    <h4>Title - {email.title}</h4>
                    <div className="email-clock">
                        <Clock />
                    </div>
                    {/* <h4>content - {email.content}</h4> */}
                    {/* <LongTxt text={email.description} /> */}
                </article>
                <hr className="email-hr" />
                {selectedEmail && <EmailDetails />}
            </Link>
        )
    }
}