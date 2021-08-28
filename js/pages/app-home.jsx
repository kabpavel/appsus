import Welcome from 'react-welcome-page'


export class Home extends React.Component {
    render() {
        return <div className="home-section">
            <img className="home-img" src="assets/homeImage.jpg" alt="" />
            <div className="welcome-container">Welcome To our app</div>
        </div>
    }
}