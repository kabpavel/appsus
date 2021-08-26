import { emailService } from "../services/email.service.js"

export class EmailCompose extends React.Component {
    state = {
        values: {
            to:'',
            firstname: '',
            lastname: '',
            emailaddress: '',
            subject: '',
            country: '',
            body: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        // console.log(target.value);
        this.setState(prevState => ({ values: { ...prevState.values, [field]: target.value } }))
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { onWritingMail, email } = this.props
        alert('A name was submitted: ' + this.state.values.firstname);
        emailService.saveEmail(this.state.values)
        onWritingMail()
    }

    render() {
        const { firstname, lastname,emailaddress,subject, country, body,to } = this.state.values
        const { onWritingMail, email } = this.props
        return (

            <div className="container">
                <button className="exit" onClick={() => {
                    onWritingMail()
                }
                }>X</button>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="to">To</label>
                    <input type="text" id="to" name="to" placeholder="Your name" value={to} onChange={this.handleChange} />
                    
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name" value={firstname} onChange={this.handleChange} />

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name" value={lastname} onChange={this.handleChange} />
                    
                    <label htmlFor="eaddress">Email Address</label>
                    <input type="text" id="eaddress" name="emailaddress" placeholder="Your email address" value={emailaddress} onChange={this.handleChange} />
                    
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="subject" value={subject} onChange={this.handleChange} />

                    <label htmlFor="country" >Country</label>
                    <select id="country" name="country" value={country} onChange={this.handleChange}>
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                        <option value="israel">Israel</option>
                    </select>

                    <label htmlFor="body">Body</label>
                    <textarea id="body" name="body" placeholder="Write something.." value={body} onChange={this.handleChange}></textarea>

                    <input type="submit" value="Submit" />

                </form>
            </div>
        )
    };

}