import {AppLayout as DefaultAppLayout, AuthLayout as DefaultAuthLayout} from "~/theme/default/layouts";
import {AppLayout as Theme1AppLayout, AuthLayout as Theme1AuthLayout} from "~/theme/theme-1/layouts";

export const availableThemes = () => {
    return {
        "default": {
            "AppLayout": DefaultAppLayout,
            "AuthLayout": DefaultAuthLayout,
        },
        "theme-1": {
            "AppLayout": Theme1AppLayout,
            "AuthLayout": Theme1AuthLayout,
        }
    }
}