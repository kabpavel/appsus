import { emailService } from "../services/email.service"

export class EmailDetails extends React.Component {
    state = {
        hover: ''
    }
    setHover = (trash) => {
        this.setState({ hover: trash });
    };
    // onDeleteEmail = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // emailService.deleteEmail(this.state.email.id).then(this.onBack)
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Your file has been deleted.',
    //                 'success'
    //             )
    //         }
    //     })
    // }
    // onBack = () => {
    //     this.props.history.push('/email')
    // }

    render() {

        const { email, onDeleteEmail,onBack } = this.props
        const { hover } = this.state
        return <section className="detailes-container">
            <div className="detailes-title-container">
                <h4 className="email-details-title">{email.subject}</h4>
                <button onClick={() => {
                    onDeleteEmail(email.id)
                    onBack()
                
                }}
                    onMouseEnter={() => this.setHover('trash-open')}
                    onMouseLeave={() => this.setHover('')}
                ><img src={hover === 'trash-open' ? 'assets/deleteOpen.png' : "assets/delete.png"} alt="" /></button>
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