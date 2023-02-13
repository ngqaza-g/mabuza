import { Box, Typography } from "@mui/material";

export default function Footer(){

    const date = new Date();
    return <Box display="flex">
        <Typography variant="body1" component="p" mx="auto" my={2}>
            Mabuzmann Copyright &copy;  {date.getFullYear()}
        </Typography>
    </Box>
}