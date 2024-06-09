'use client'
import { Button } from '@/components/ui/button'
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, {  useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { db } from '@/dbConfigs'
import { JsonForms } from '@/dbConfigs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'


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

    const [formList , setFormList] = useState([]);
    const [progressBar , setProgressBar] = useState(0);

    const path = usePathname();
    const {user} = useUser();
    
    const getFormList = async ()=>{

        const result = await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy , user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));
        setFormList(result);

        const percentage  = (result.length / 5)*100 ;
        setProgressBar(percentage);
       
      } 
      useEffect(() => {
        user && getFormList()
      }, [user])

      
      



  return (
    <div className=' h-screen shadow-md border '>

        <div className=" p-5 ">
        {menuList.map((item,index)=>(
            <Link href={item.path} key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary cursor-pointer
            hover:text-white rounded-lg  ${path === item.path && 'bg-primary text-white'} `}    >
                <item.icon/>
                {item.name}
            </Link>
        ))}
        </div>

        <div className=" fixed bottom-7 p-6 w-64 ">
            <Button className='w-full' >
               + Create Form
            </Button>
            <div className=" my-7">

            <Progress value={progressBar} />
            <h2 className=" text-sm mt-2 text-gray-700">
                <strong>{formList?.length}</strong> out of <strong>5 </strong>file created
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