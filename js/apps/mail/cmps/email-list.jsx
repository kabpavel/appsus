import { EmailPreview } from '../cmps/email-preview.jsx';

export class EmailList extends React.Component {
    render() {
        const { emails, onSelectEmail , onDeleteEmail,onBack,saveToDraft} = this.props
        if(!emails)return <div>Loading ...</div>
        return (
            <div className="email-list">
                {emails.map(email => <EmailPreview key={email.id} email={email} onWritingMail={this.props.onWritingMail} onDeleteEmail={onDeleteEmail} onBack={onBack} onSelectEmail={onSelectEmail} saveToDraft={saveToDraft}/>)}
            </div>
        );
    }
}