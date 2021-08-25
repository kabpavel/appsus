const { Link } = ReactRouterDOM

import { Clock } from '../../../cmps/clock.jsx';
// import { LongTxt } from './LongTxt.jsx'

export function EmailPreview({ email, onSelectEmail }) {
    return (
        <Link to={`/email/${email.id}`} >
            <article onClick={() => { onSelectEmail(email) }} className="email-preview">
                <h4>name - {email.name}</h4>
                <h4>Title - {email.title}</h4>
                <div className="email-clock">
                    <Clock />
                </div>
                {/* <h4>content - {email.content}</h4> */}
                {/* <LongTxt text={email.description} /> */}
            </article>
            <hr className="email-hr" />
        </Link>
    )
}