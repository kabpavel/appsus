export class EmailDetails extends React.Component {
    render(){
        const { email, onDeleteEmail }= this.props

        return <section className="detailes-container">
                    <h4 className="email-details-title">{email.title}</h4>
                  <h4 className="email-details-name"> <span>{email.name}</span> {'<'+email.emailAddress+'>'}</h4>
                  <h4 className="email-details-content"> {email.content}</h4>
                    <div className="email-clock">
                        {/* <Clock /> */}
                    </div>
                    <hr className="email-hr"/>
                    {/* <h4>content - {email.content}</h4> */}
        </section>
    }
}