import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
const DownloadFile = lazy(() => import('./page/OperateFile/OperateFile'))
const Demo = lazy(() => import('./page/Demo/Demo'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/download-file',
        element: <DownloadFile />,
    },
    {
        path: '/demo',
        element: <Demo />,
    },
])
export default router
