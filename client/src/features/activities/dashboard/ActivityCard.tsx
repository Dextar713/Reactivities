import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    activity: Activity;
    selectActivity: (id: string) => void;
}

export default function ActivityCard(props: Props) {
    const {deleteActivity } = useActivities();

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{props.activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{props.activity.title}</Typography>
                <Typography variant="body2">{props.activity.description}</Typography>
                <Typography variant="subtitle1">{props.activity.city} / {props.activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={props.activity.category} variant="outlined"></Chip>
                <Box display='flex' gap={3 }>
                    <Button onClick={() => props.selectActivity(props.activity.id)} size="medium" variant="contained">View</Button>
                    <Button onClick={() => deleteActivity.mutate(props.activity.id)} size="medium" variant="contained"
                        color="error" disabled={deleteActivity.isPending}>
                        Delete
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )
}