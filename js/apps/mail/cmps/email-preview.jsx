const { Link } = ReactRouterDOM

import { Clock } from '../../../cmps/clock.jsx';
import { EmailDetails } from './email-details-cmp.jsx';
// import { LongTxt } from './LongTxt.jsx'

export class EmailPreview extends React.Component {
    state = {
        selectedEmail: null
    }

    toggleChangeSelect = () => {
        const { selectedEmail } = this.state
        if (!selectedEmail) {

            const { email, onSelectEmail } = this.props
            onSelectEmail(email)
            this.setState({ selectedEmail: email })
        }
        else {
            const { email, onSelectEmail } = this.props
            onSelectEmail(null)
            this.setState({ selectedEmail: null })
        }
    }
    render() {
        const { email, onDeleteEmail } = this.props
        const { selectedEmail } = this.state
        return (
            <Link to={`/email/${email.id}`} >
                <article onClick={() => {
                    this.toggleChangeSelect()

                }} className={selectedEmail?"email-preview email-selected":"email-preview"}>
                    <div>
                        <h4> {email.name}</h4>
                        <h4> {email.title}</h4>
                        <h4> {email.content}</h4>
                    </div>
                    <div className="email-clock">
                        <Clock />
                    </div>
                    {/* <LongTxt text={email.description} /> */}
                </article>
                <hr className="email-hr" />
                {selectedEmail && <EmailDetails email={email} onDeleteEmail={onDeleteEmail} />}
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