import { Switch } from "@mui/material";
import { styled } from '@mui/material/styles';


const Toggle = styled((props) => (
    <Switch  size="small" focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        color: 'var(--text-muted)',
        '&.Mui-checked': {
            color: 'var(--text-normal)',
            '& + .MuiSwitch-track': {
                backgroundColor: "var(--brand-experiment)",
                opacity: 1
            }
        }
    },
    '& .MuiSwitch-track': {
        backgroundColor: "var(--text-normal)",
    },
}));

export default Toggle;