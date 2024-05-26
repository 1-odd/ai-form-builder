'use client'
import { Button } from '@/components/ui/button'
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Progress } from "@/components/ui/progress"


const SideNavbar = () => {

    const menuList = [
        {
            id:1,
            name:'My Forms',
            icon: LibraryBig,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Responses',
            icon: MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:3,
            name:'Analytics',
            icon: LineChart,
            path:'/dashboard/analytics'
        },
        {
            id:4,
            name:'Upgrade',
            icon: Shield,
            path:'/dashboard/upgrade'
        }
    ]

    const path = usePathname();



  return (
    <div className=' h-screen shadow-md border bg-white'>

        <div className=" p-5 ">
        {menuList.map((item,index)=>(
            <h2 key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary cursor-pointer
            hover:text-white rounded-lg  ${path === item.path && 'bg-primary text-white'} `}    >
                <item.icon/>
                {item.name}
            </h2>
        ))}
        </div>

        <div className=" fixed bottom-7 p-6 w-64 ">
            <Button className='w-full' >
               + Create Form
            </Button>
            <div className=" my-7">

            <Progress value={33} />
            <h2 className=" text-sm mt-2 text-gray-700">
                <strong>3 </strong>out of <strong>5 </strong>file created
            </h2>
            <h2 className=" text-sm mt-3 text-gray-700">
                Upgrade your plan for genrating unlimited form
            </h2>

            </div>
        </div>
       
    </div>
  )
}

export default SideNavbar