import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Paper sx={{
            display: 'flex', flexDirection: 'column',
            height: 400, justifyContent: 'center', alignItems: 'center', p:6
        }}> 
            <SearchOff sx={{fontSize:100} }>
            </SearchOff>
            <Typography gutterBottom variant='h3'>Oops - we could not find what you were looking for!</Typography>
            <Button fullWidth component={Link } to='/activities'>Return to the activities page</Button>
        </Paper>
    )
}