import {Outlet} from 'react-router-dom'
import {Suspense} from "react";
import {Loading} from "~/core/components/Loading";
import '../styles/form.css'

export const AppLayout = () => {
    return (
        <div className="App flex flex-row min-h-screen bg-gray-900 text-gray-800 min-w-screen grid grid-cols-5">
            <div className="w-full min-h-screen col-span-4 overflow-hidden">
                <Suspense
                    fallback={
                        <div className="fixed top-0 h-screen w-screen grid place-items-center">
                            <Loading/>
                        </div>
                    }
                >
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    )
}
