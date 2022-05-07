import { styled, TextField } from "@mui/material";

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'var(--brand-experiment)',
        },
    },
});

function Login() {
    return (
        <div className="auth-page login">
            <div className="root">
                <div className="top">
                    <span className="head">Welcome to Mesa</span>
                    <span className="sub-head">Login to your mesa account</span>
                </div>

                <CssTextField
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    color="info"
                    inputProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--text-normal)" } }}
                    InputLabelProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--text-normal)" } }}
                />

                <CssTextField
                    type="password"
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    color="info"
                    inputProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--text-normal)" } }}
                    InputLabelProps={{ style: { fontFamily: "var(--font-primary)", color: "var(--text-normal)" } }}
                />

                <div className="button">Login</div>
            </div>
        </div>
    );
}

export default Login;