import { Grid } from "@mui/material";
import ProfilePicture from "./ProfilePicture";
import UserDetails from "./UserDetails";

export default function UserSettings(){
    return <Grid container>
        <Grid item xs={6}>
            <UserDetails />
        </Grid>
        <Grid item xs={6} display="flex">
            <ProfilePicture />
        </Grid>
    </Grid>
}