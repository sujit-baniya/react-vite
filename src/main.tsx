import {lazy, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const AuthProvider = lazy(() => import("~/core/hooks/auth/Provider"));
const Routes = lazy(() => import("~/routes"));
import {Helmet, HelmetProvider} from "~/packages/helmet";
import { ErrorBoundary } from "~/core/components/ErrorBoundary";

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <StrictMode>
        <HashRouter>
            <ErrorBoundary>
                <HelmetProvider>
                    <Helmet>
                        <title>Test App</title>
                    </Helmet>
                    <AuthProvider>
                        <Routes/>
                    </AuthProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </HashRouter>
    </StrictMode>
)
