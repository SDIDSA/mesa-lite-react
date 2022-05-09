function Button(props) {
    return (
        <div
            onClick={props.onClick}
            className="button"
            style={{ minWidth: (props.fullWidth ? "100%" : "auto") }}>
            {props.label}
        </div>
    )
}

export default Button;