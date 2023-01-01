import {createContext, ReactNode, useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {HttpClient} from "~/core/helpers/api";
import {useUserStore} from "~/core/stores/user-store";

export class User {
    public role: string = "";
    public email: string = "";
}

class Auth {
    private base_url = '';
    private auth_login_uri = '/login';
    private auth__logout_uri = '/logout';
    private user?: User;

    constructor(baseUrl?: string) {
        this.base_url = baseUrl || import.meta.env.VITE_API_URL
    }

    login(username: string, password: string, remember_me: boolean) {
        return HttpClient.post(this.getLoginUrl(), {
            username: username,
            password: password,
            remember_me: remember_me
        })
    }

    logout() {
        return HttpClient.post(this.getLogoutUrl())
    }

    requestPasswordRecovery(email: String) {
        return HttpClient.post(this.getLogoutUrl())
    }

    verify(url: String, email: String) {
        return HttpClient.post(this.getLogoutUrl())
    }

    setAuthUser(user?: any) {
        this.user = user
    }

    currentUser() {
        return this.user;
    }

    private getLoginUrl() {
        return this.base_url + this.auth_login_uri;
    }

    private getLogoutUrl() {
        return this.base_url + this.auth__logout_uri;
    }
}

// Instantiate the GoTrue auth client.
export const auth = new Auth()

type AuthContext = {
    loggedIn: boolean
    loggedOut: boolean
    isAdmin: boolean
    login: (user?: User) => void
    logout: () => void
    user?: User | null
}

export const DefaultUserContext: AuthContext = {
    login(user: User | undefined): void {
    },
    logout(): void {
    },
    user: null,
    loggedIn: false,
    loggedOut: false,
    isAdmin: false
}

export const UserContext = createContext(DefaultUserContext)

export const Provider = ({children}: { children?: ReactNode }) => {
    const navigate = useNavigate()
    const userStore = useUserStore()
    if (userStore.user && !auth.currentUser()) {
        auth.setAuthUser(userStore.user)
    }
    const user = auth.currentUser()
    const [loggedIn, setLoggedIn] = useState(!!user)
    const [loggedOut, setLoggedOut] = useState(false)
    const [isAdmin, setIsAdmin] = useState(user?.role === 'admin')

    // This methods would communicate with a backend, obtain/verify a token, etc.
    const login = (user ?: User) => {
        auth.setAuthUser(Object.setPrototypeOf(user, User.prototype))
        userStore.setUser(Object.setPrototypeOf(user, User.prototype))
        setLoggedIn(true)
        setLoggedOut(false)
        navigate('/')
    }
    useEffect(() => {
        setLoggedIn(!!auth.currentUser())
        setIsAdmin(auth.currentUser()?.role === 'admin')
    }, [auth.currentUser()])
    // Clear stored cookies and set false for loggedIn state.
    const logout = () => {
        auth.logout()
            .then((_response: any) => {
                setLoggedIn(false)
                setLoggedOut(true)
                auth.setAuthUser(null)
                userStore.setUser(null)
                navigate('/login?loggedOut=true')
            })
            .catch((error: any) => {
                console.info('Failed to logout user: %o', error)
                throw error
            })
    }
    return (
        <UserContext.Provider value={{user, loggedIn, loggedOut, isAdmin, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export function useAuthentication() {
    return useContext(UserContext)
}

export default Provider