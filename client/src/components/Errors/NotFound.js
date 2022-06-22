import { Box } from '@mui/material'
import { Typography } from "@material-ui/core";

export default function NotFound() {
    return (
        <>
            <Box style={{ padding: '15em 0', backgroundColor: 'rgb(34, 34, 34)' }}>
                <Typography style={{ fontSize: '7em', textAlign: 'center', color: 'white' }}>
                    Error 404: Not found
                </Typography>
                <Typography style={{ fontSize: '3em', textAlign: 'center', color: 'white' }}>
                    Такого пути не существует!
                </Typography>
            </Box>
        </>
    )
}