import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

type Router = {
    path: string
    element: React.ReactNode
    name: string
}
const DownloadFile = lazy(() => import('./page/OperateFile/OperateFile'))
const TimeSelect = lazy(() => import('./page/TimeSelect/TimeSelect'))

export const router: Router[] = [
    {
        path: '/',
        element: <App />,
        name: 'Home',
    },
    {
        path: '/download-file',
        element: <DownloadFile />,
        name: 'Download File',
    },
    {
        path: '/time-select',
        element: <TimeSelect />,
        name: 'Time Select',
    },
]
const routers = createBrowserRouter([...router])
export default routers
