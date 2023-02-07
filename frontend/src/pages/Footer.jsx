import { Box, Typography } from "@mui/material";

export default function Footer(){

    const date = new Date();
    return <Box display="flex" sx={{flexGrow: 1}}>
        <Typography variant="body1" component="p" m="auto">
            Mabuzmann Copyright &copy;  {date.getFullYear()}
        </Typography>
    </Box>
}