import React, {lazy} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const AuthProvider = lazy(() => import("~/core/hooks/AuthProvider"));
const Routes = lazy(() => import("~/routes"));

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </HashRouter>
    </React.StrictMode>
)
