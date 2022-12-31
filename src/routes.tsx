import {useRoutes} from 'react-router-dom'
import {lazily} from "~/core/components/lazily";
import {availableThemes} from "~/theme";

const {Home} = lazily(() => import("~/views/Home"));

export const Routes = ({theme = "default"}) => {
    theme = theme || "default"
    // @ts-ignore
    const AuthLayout = availableThemes()[theme].AuthLayout
    return useRoutes([
        {
            element: <AuthLayout/>,
            children: [
                {path: '/', element: <Home/>},
            ]
        }
    ])
}

export default Routes