const { Link } = ReactRouterDOM

import { Clock } from '../../../cmps/clock.jsx';
import { emailService } from '../services/email.service.js';
import { EmailDetails } from './email-preview-span.jsx';
import { LongTxt } from './LongTxt.jsx';
import { Star } from './star.jsx';
// import { LongTxt } from './LongTxt.jsx'

export class EmailPreview extends React.Component {
    state = {
        selectedEmail: null,

    }

    starClicked = false;
    onStarChange = () => {
        this.starClicked = true;
        // setTimeout(()=>{
        //     this.setState({ selectedEmail: null })
        //     console.log('selectedEmail',this.state.selectedEmail)
        // },0.1)


    }

    toggleChangeSelect = () => {
        if (!this.starClicked) {
            const { selectedEmail } = this.state
            if (!selectedEmail) {

                const { email, onSelectEmail } = this.props
                onSelectEmail(email)
                email.isRead = true
                this.setState({ selectedEmail: email })
            }
            else {
                const { email, onSelectEmail } = this.props
                onSelectEmail(null)
                this.setState({ selectedEmail: null })
            }
        }
        else {
            const { email, onSelectEmail } = this.props
            email.star=true;
        }
        this.starClicked = false;
    }
    render() {
        const { email, onBack, onDeleteEmail } = this.props
        const { selectedEmail } = this.state
        return (
            <Link to={`/email/${email.id}`} >
                <article onClick={() => {
                    this.toggleChangeSelect()

                }} className={selectedEmail ? "email-preview email-selected" : "email-preview"}>

                    <div className="email-user-container">
                        <img className="user-picture" src="assets/unnamed.png" alt="user-pic" />
                        <div className="email-text-preview-container">
                            <Star onStarChange={this.onStarChange} />
                            <h4 className="email-preview-name"> {email.name}</h4>
                            <h4 className="email-preview-title"> {email.subject} -</h4>
                            <LongTxt text={email.body} />
                        </div>
                    </div>
                    <div className="email-clock">
                        <Clock />
                    </div>

                </article>
                <hr className="email-hr" />
                {selectedEmail && <EmailDetails email={email} onBack={onBack} onDeleteEmail={onDeleteEmail}  />}
            </Link>
        )
    }
}
// {
/* <React.Fragment>
<tr onClick={() => { this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded })) }}>

    <td>{car.vendor}</td>
    <td>{car.price}</td>
    <td>
        <Link to={`/car/${car.id} /${car.vendor}`}>Details</Link> |
        <Link to={`/car/edit/${car.id}`}>Edit</Link>
    </td>
</tr>
<tr hidden={!this.state.isExpanded}>
    <td colSpan="3"> <img src={`https://robohash.org/${car.id}`} />
    </td>
</tr >
</React.Fragment > */
// }