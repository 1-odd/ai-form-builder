import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNavbar from './_components/SideNavbar'

function DashboardLayout({children}) {
  return (
    <SignedIn>
    <div >
       <div className="  fixed md:w-64 hidden md:block">
        <SideNavbar/>
       </div>
       <div className=" md:ml-64">
          {children}
       </div>
        
           
        
    </div>
    </SignedIn>
  )
}

export default DashboardLayout