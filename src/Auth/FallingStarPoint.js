
function FallingStarPoint(props) {
    return (
        <div style={{
            width: (1 + (7 - props.index) / 3) + "px",
            height: (1 + (7 - props.index) / 3) + "px", 
            position: "fixed",
            borderRadius: "100%",
            top: props.pos[props.index].y, 
            left: props.pos[props.index].x,
            opacity: 1 - (props.index / 7) * .8,
            backgroundColor:"currentcolor",
            transition: "none"
        }}></div>
    );
}

export default FallingStarPoint;