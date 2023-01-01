import {Outlet} from 'react-router-dom'
import {Suspense} from "react";

export const AuthLayout = () => {
    return (
        <main className='flex h-full min-h-screen items-center bg-white py-16 min-w-screen'>
            <Suspense
                fallback={
                    <div className="fixed top-0 h-screen w-screen grid place-items-center">
                        <div>Loading</div>
                    </div>
                }
            >
                <Outlet/>
            </Suspense>
        </main>
    )
}
