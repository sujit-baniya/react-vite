import {lazy, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const AuthProvider = lazy(() => import("~/core/hooks/auth/AuthProvider"));
const Routes = lazy(() => import("~/routes"));
import reportWebVitals from  './reportWebVitals'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <StrictMode>
        <HashRouter>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </HashRouter>
    </StrictMode>
)

reportWebVitals()