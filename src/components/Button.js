function Button(props) {
    let width = props.width ? props.width : (props.fullWidth ? "100%" : "auto");
    return (
        <div
            style={{ minWidth:width, maxWidth:width }}
            className={`button${props.loading ? " loading" : ""}${props.disable ? " disable" : ""}${props.invert ? " invert" : ""}`}>
            <div className="clickable"
                onClick={props.onClick}>
                {props.label}
            </div>
            <span className="spinner"></span>
        </div>
    )
}

export default Button;