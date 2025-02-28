import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '', element: <HomePage></HomePage>
            },
            {
                path: 'activities', element: <ActivityDashboard></ActivityDashboard>
            },
            {
                path: 'createActivity', element: <ActivityForm key='create'></ActivityForm>
            },
            {
                path: 'activities/:id', element: <ActivityDetail></ActivityDetail>
            },
            {
                path: 'manage/:id', element: <ActivityForm></ActivityForm>
            }
        ]
    }
])