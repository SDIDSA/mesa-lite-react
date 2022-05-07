import './FallingStars.css'
import FallingStar from './FallingStar';
function FallingStars() {
    let stars = []
    for(let i = 0; i<24;i++) {
        stars.push(<FallingStar key={i}/>)
    }

    return(
        <div className="falling-stars">
            {stars}
        </div>
    );
}

export default FallingStars;