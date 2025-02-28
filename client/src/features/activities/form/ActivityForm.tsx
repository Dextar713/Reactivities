import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";


export default function ActivityForm() {
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const formData = new FormData(event.currentTarget)
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        })
        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`)
        } else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`)
                }
            });
        }
        
    }

    if(isLoadingActivity) return <Typography>Loading activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color='primary'>
                {activity ? 'Edit Activity' : 'Create activity'}
            </Typography>
            <Box id="activityForm" onSubmit={handleSubmit} component="form" display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={activity?.title }></TextField>
                <TextField name='description' label='Description' multiline rows={3} defaultValue={activity?.description}></TextField>
                <TextField name='category' label='Category' defaultValue={activity?.category}></TextField>

                <TextField name='date' label='Date' type='date'
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}>
                </TextField>

                <TextField name='city' label='City' defaultValue={activity?.city}></TextField>
                <TextField name='venue' label='Venue' defaultValue={activity?.venue}></TextField>
                <Box display='flex' justifyContent='end' gap={3} >
                    <Button name="cancel" color='inherit' onClick={() => { } }>Cancel</Button>
                    <Button name="submit" color='success' variant='contained' type='submit'
                        disabled={updateActivity.isPending || createActivity.isPending}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}