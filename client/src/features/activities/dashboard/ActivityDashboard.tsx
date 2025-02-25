import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    //children: React.ReactNode;
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
}
export default function ActivityDashboard(props: Props) {
    return (
        <Grid2 container spacing={3 }>
            <Grid2 size={7}>
                <ActivityList activities={props.activities} selectActivity={props.selectActivity} />
            </Grid2>
            <Grid2 size={5}>
                {props.selectedActivity && !props.editMode && <ActivityDetail selectedActivity={props.selectedActivity}
                    cancelSelectActivity={props.cancelSelectActivity} openForm={props.openForm } />}
                {props.editMode && <ActivityForm closeForm={props.closeForm} activity={props.selectedActivity}></ActivityForm>}
            </Grid2>
        </Grid2>
    )
} 