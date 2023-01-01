import {useRoutes} from 'react-router-dom'
import {lazily} from "~/packages/lazily";
import {availableThemes} from "~/theme";

const {Home} = lazily(() => import("~/pages/Home"));

export const Routes = ({theme = "default"}) => {
    theme = theme || "default"
    // @ts-ignore
    const AuthLayout = availableThemes()[theme].AuthLayout
    console.log("123")
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