import { EmailList } from '../cmps/email-list.jsx';

export class Email extends React.Component {
    
    render() {
        return <section className="email-container">
            <h1>Email</h1>
            <EmailList/>
        </section>
    }
}