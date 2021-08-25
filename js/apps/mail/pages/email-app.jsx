import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/email-list.jsx';
// import { BookFilter } from '../cmps/BookFilter.jsx';
// import { BookDetails } from './BookDetails.jsx';
// import { AddEmail } from '../cmps/add-email.jsx';

export class Email extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
    }
    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy).then((emails) => {
            console.log('emails', emails);
            this.setState({ emails });

        });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails);
    };

    onSelectEmail = (book) => {
        this.setState({ selectedBook: book });
    };

    onDeleteBook = (bookId) => {
        bookService.deleteBook(bookId)
        this.onSelectEmail(null)
        this.loadEmails()
    }

    render() {
        const { emails, selectedEmail } = this.state
        if (!emails.length) return <div>Loading...</div>
        return <section className="book-app">
            {!selectedEmail && (
                <React.Fragment>
                    {/* <AddEmail/> */}
                    {/* <EmailFilter onSetFilter={this.onSetFilter} /> */}
                    <EmailList emails={emails} onSelectEmail={this.onSelectEmail} />
                </React.Fragment>
            )}
            {/* {selectedBook && <BookDetails book={selectedBook} onBack={() => this.onSelectEmail(null)} onDeleteBook={this.onDeleteBook} />} */}
        </section>
    }
}