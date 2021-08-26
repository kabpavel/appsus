export class ImageHover extends React.Component {

    state = {
        hover: ''
    }

    setHover = (isHover) => {
        this.setState({ hover: isHover });
    };

    render() {
        const { className, onHoverSrc, onRegularSrc, onClick} = this.props
        const { hover } = this.state

        return (<img className={className} 
        onMouseEnter={() => this.setHover('on-hove')}
        onMouseLeave={() => this.setHover('')} 
        onClick={onClick}
        src={hover === 'on-hove' ?  {onHoverSrc} : {onRegularSrc} } alt="" />)
    }
}