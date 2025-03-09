import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/index.css'
import './app/layout/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './app/router/Routes.tsx';
import { RouterProvider } from 'react-router';
import { store, StoreContext } from './lib/stores/store.ts';
import { ToastContainer} from 'react-toastify'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreContext.Provider value={store}></StoreContext.Provider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools></ReactQueryDevtools>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>

    </StrictMode>,
)