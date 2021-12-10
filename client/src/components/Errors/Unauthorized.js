import { Box } from '@mui/material'
import { Typography } from "@material-ui/core";

export default function Unauthorized() {
    return (
        <>
            <Box style={{padding:'15em 0', backgroundColor:'rgb(34, 34, 34)'}}>
                <Typography style={{ fontSize: '7em', textAlign: 'center', color:'white'}}>
                    Error 401: Unauthorized
                </Typography>
                <Typography style={{ fontSize: '2em', textAlign: 'center', color:'white'}}>
                    Вы можете войти в свой профиль или зарегестрироваться
                </Typography>
            </Box>
        </>
    )
}