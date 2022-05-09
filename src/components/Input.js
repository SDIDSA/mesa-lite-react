import { styled, TextField } from "@mui/material";

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'var(--brand-experiment)',
        },
    },
});

function Input(props) {
    return (
        <CssTextField
            error={props.hint !== ""}
            helperText={props.hint}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            fullWidth
            id={props.id}
            label={props.label}
            variant="outlined"
            color="info"
            inputProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--text-normal)" } }}
            InputLabelProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--channels-default)" } }}
            FormHelperTextProps={{ style: { fontFamily: "var(--font-primary)"}}}
        />
    )
}

export default Input;