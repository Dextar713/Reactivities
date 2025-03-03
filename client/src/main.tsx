import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/index.css'
import './app/layout/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './app/router/Routes.tsx';
import { RouterProvider } from 'react-router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools></ReactQueryDevtools>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>

    </StrictMode>,
)