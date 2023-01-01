import {AppLayout as DefaultAppLayout, AuthLayout as DefaultAuthLayout} from "~/theme/default/layouts";
import {AppLayout as Theme1AppLayout, AuthLayout as Theme1AuthLayout} from "~/theme/theme-1/layouts";

export const availableThemes = () => {
    return [
        {
            name: 'Default',
            key: 'default',
            appLayout: DefaultAppLayout,
            authLayout: DefaultAuthLayout
        },
        {
            name: 'Theme 1',
            key: 'theme-1',
            appLayout: Theme1AppLayout,
            authLayout: Theme1AuthLayout
        }
    ]
}

export const getThemeByKey = (key: string) => availableThemes().find(theme => theme.key === key)