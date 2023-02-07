import { Grid } from "@mui/material";
import ActiveDriver from "./ActiveDriver";
import Map from "./Map";

export default function DashboardIndex(){
    return <Grid container spacing={2}>
        <Grid item xs={6}>
            <ActiveDriver />
        </Grid>
        <Grid item xs={6}>
            <Map />
        </Grid>
    </Grid>
}