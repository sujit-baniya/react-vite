import {Outlet} from 'react-router-dom'
import {Suspense} from "react";
import {Loading} from "~/core/components/Loading";

export const AuthLayout = () => {
    return (
        <main className='flex h-full min-h-screen items-center bg-white py-16 min-w-screen'>
            <Suspense
                fallback={
                    <div className="fixed top-0 h-screen w-screen grid place-items-center">
                        <Loading/>
                    </div>
                }
            >
                <Outlet/>
            </Suspense>
        </main>
    )
}
