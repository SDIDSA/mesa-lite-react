
function FallingStarPoint(props) {
    let width = props.index == 0 ? 5: 1;
    let height = props.index == 0 ? 10: 5;
    var theta = Math.atan2(-props.pos[props.index].rdy, -props.pos[props.index].rdx); 
    theta *= 180 / Math.PI;           
    if (theta < 0) theta += 360;
    return (
        <div style={{
            width: width + "px",
            height: height + "px",
            transform: "rotate("+(theta + 90)+"deg)",
            position: "fixed",
            borderRadius: "100%",
            top: props.pos[props.index].y - height / 2, 
            left: props.pos[props.index].x - width / 2,
            opacity: 1 - (props.index / 15) * .8,
            backgroundColor:"currentcolor",
            transition: "none"
        }}></div>
    );
}

export default FallingStarPoint;