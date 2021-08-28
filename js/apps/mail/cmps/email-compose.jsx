import { emailService } from "../services/email.service.js"

export class EmailCompose extends React.Component {
    state = {
        values: {
            to: '',
            name: '',
            emailaddress: '',
            subject: '',
            body: '',
        }
    }
    ComponenentDidMount() {
     
        const { email, isDraft } = this.props
        const { name, emailaddress, subject, body, to } = email
        if (isDraft) {
            console.log("stack here")
            this.setState({
                values: {
                    ...this.state.values, [name]: name, [emailaddress]: emailaddress,
                    [subject]: subject, [body]: body, [to]: to
                }
            })

        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        // console.log(target.value);
        this.setState(prevState => ({ values: { ...prevState.values, [field]: target.value } }))
    }


    handleSubmit = (event) => {
        console.log("okk what the fuck is going on")
        event.preventDefault();
        const { onWritingMail, email, isDraft } = this.props
        const { name, emailaddress, subject, body, to } = this.state.values
        alert('A name was submitted: ' + this.state.values.firstname);
        if (isDraft) {
            email.name = name;
            email.emailaddress = emailaddress;
            email.subject = subject;
            email.body = body;
            email.to = to;
            emailService.saveEmail(email)
        }
        else {
            emailService.saveEmail(this.state.values)
        }
        // emailService.saveEmail(this.state.values)
        console.log('write it already')
        onWritingMail()
    }

    render() {
        const { name, emailaddress, subject, body, to } = this.state.values
        const { onWritingMail } = this.props
        debugger

        return (
            <div className="compose-email-container">
                <button className="exit" onClick={() => {
                    onWritingMail()
                }
                }> <img src="assets/delete.png" alt="" /> </button>
                <form onSubmit={this.handleSubmit} >

                    <label htmlFor="to">To</label>
                    <input type="text" id="to" name="to" placeholder="name@mail.com" value={to} onChange={this.handleChange} />

                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" value={name} onChange={this.handleChange} />

                    <label htmlFor="eaddress">Email Address</label>
                    <input type="text" id="eaddress" name="emailaddress" placeholder="Your email address" value={emailaddress} onChange={this.handleChange} />

                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="subject" value={subject} onChange={this.handleChange} />

                    {/* <label htmlFor="country" >Country</label>
                    <select id="country" name="country" value={country} onChange={this.handleChange}>
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                        <option value="israel">Israel</option>
                    </select> */}

                    <label htmlFor="body">Body</label>
                    <textarea id="body" name="body" placeholder="Write something.." value={body} onChange={this.handleChange}></textarea>

                    <input type="submit" value="Submit" />

                </form>
            </div>
        )
    };

}