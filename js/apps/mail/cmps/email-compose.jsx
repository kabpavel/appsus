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
    componentDidMount() {
        const { email, isDraft } = this.props
        if (isDraft) {
            const { name, emailaddress, subject, body, to } = email
            console.log(email);
            this.setState({
                values: {  name,  emailaddress,
                    subject,  body,  to
                }
            }, () => {
                console.log('this.state.values',this.state.values);})           
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        console.log('field',field)
        this.setState(prevState => ({ values: { ...prevState.values, [field]: target.value } }))
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { onWritingMail, email, isDraft,onSendMail } = this.props
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your mail as been sent',
          showConfirmButton: false,
          timer: 1500
        })
        if (isDraft) {
            const { name, emailaddress, subject, body, to } = this.state.values
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
        onSendMail()
        // emailService.saveEmail(this.state.values)
        onWritingMail()
    }

    render() {
        const { name, emailaddress, subject, body, to } = this.state.values
        const { onWritingMail,saveToDraft ,} = this.props
        return (
            <div className="compose-email-container">
                <button className="exit" onClick={() => {
                    Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: `Save`,
                        denyButtonText: `Don't save`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            saveToDraft(this.state.values)
                          Swal.fire('Saved to draft!', '', 'success')
                        } else if (result.isDenied) {
                          Swal.fire('Changes are not saved', '', 'info')
                        }
                      })
                    onWritingMail()
                }
                }> <img src="assets/delete.png" alt="" /> </button>
                <form /*onSubmit={this.handleSubmit}*/>

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

                    {/* <input type="submit" value="Submit" /> */}
                    <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    };

}