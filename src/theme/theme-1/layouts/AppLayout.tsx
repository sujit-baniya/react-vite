import {Outlet} from 'react-router-dom'
import {Suspense} from "react";

export const AppLayout = () => {
    return (
        <div className="App flex flex-row min-h-screen bg-gray-500 text-gray-800 min-w-screen grid grid-cols-5">
            <div className="w-full min-h-screen col-span-4 overflow-hidden">
                <Suspense
                    fallback={
                        <div className="fixed top-0 h-screen w-screen grid place-items-center">
                            <div>Loading</div>
                        </div>
                    }
                >
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    )
}
