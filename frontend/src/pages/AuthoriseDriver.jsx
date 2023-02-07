import { Search } from "@mui/icons-material";
import { Container, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import InputField from "../components/InputField";

export default function AuthoriseDriver(){
    return <Container maxWidth="lg" sx={{display: "flex", flexDirection: "column"}}>
        <Box mx="auto">
            <Typography variant="h5" component="h5" my={3}>Authorise a Driver</Typography>
            <Box maxWidth="350px" minWidth="300px">
                <InputField 
                    id="search_driver"
                    name="search_driver"
                    label="Search Driver"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>


        </Box>
    </Container>
}

