import {useRoutes} from 'react-router-dom'
import {lazily} from "~/packages/lazily";
import { getThemeByKey } from "~/theme";
import { withLoggedIn, withLoggedOut } from "~/core/hooks/auth/Context";

const {Home} = lazily(() => import("~/pages/Home"));
const {Dashboard} = lazily(() => import("~/pages/Dashboard"));
const {Login} = lazily(() => import("~/pages/auth/Login"));
const {Recovery} = lazily(() => import("~/pages/auth/Recovery"));
const {ResetPassword} = lazily(() => import("~/pages/auth/ResetPassword"));

export const Routes = ({theme = "default"}) => {
    theme = theme || "default"
    const [currentTheme, setCurrentTheme] = useState(getThemeByKey(theme));
    // @ts-ignore
    const AuthLayout = currentTheme.authLayout
    // @ts-ignore
    const AppLayout = currentTheme.appLayout
    return useRoutes([
        {path: '/', element: <Home/>},
        {
            element: <AuthLayout/>,
            children: [
                {path: 'login', element: withLoggedOut(Login)()},
                {path: 'recovery', element: withLoggedOut(Recovery)()},
                {path: 'reset-password', element: withLoggedOut(ResetPassword)()},
            ],
        },
        {
            element: <AppLayout/>,
            children: [
                {path: '/dashboard', element: withLoggedIn(Dashboard)()},
            ]
        }
    ])
}

export default Routes