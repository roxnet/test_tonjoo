//import React
import React from 'react';

//import Link
import { Link } from '@inertiajs/inertia-react';


function Layout({ children }) {
    
    return (
        <>
            <div className="bg-gray-100 font-family-karla flex">
             

                <div className="w-full flex flex-col h-screen overflow-y-hidden">
                
                    <div className="w-full overflow-x-hidden border-t flex flex-col">
                        <main className="w-full flex-grow p-6">
                        { children }
                        </main>
                
                       
                    </div>
                    
                </div>
            </div>
        </>
    )

}

export default Layout