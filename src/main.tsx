import {lazy, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const AuthProvider = lazy(() => import("~/core/hooks/auth/AuthProvider"));
const Routes = lazy(() => import("~/routes"));
import reportWebVitals from  './reportWebVitals'
import {Helmet, HelmetProvider} from "~/packages/helmet";

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <StrictMode>
        <HashRouter>
            <HelmetProvider>
                <Helmet>
                    <title>Test App</title>
                </Helmet>
                <AuthProvider>
                    <Routes/>
                </AuthProvider>
            </HelmetProvider>
        </HashRouter>
    </StrictMode>
)

reportWebVitals()