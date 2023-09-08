import { createRoot } from 'react-dom/client'
import React, { Suspense } from 'react'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

document.body.innerHTML = '<div id="root"></div>'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ScopedCssBaseline>
            <Suspense fallback={<Skeleton animation="wave" height={118} />}>
                <RouterProvider router={router} />
            </Suspense>
        </ScopedCssBaseline>
    </React.StrictMode>
)
