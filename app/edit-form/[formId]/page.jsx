'use client'
import { db } from '@/dbConfigs'
import { JsonForms } from '@/dbConfigs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import FormUi from '../_components/FormUi'

const EditForm = ({params}) => {

    const [jsonResult , setJsonResult] = React.useState()
   
    const {user} = useUser();
    const router = useRouter();
    useEffect(() => {
      
       user && getFormData();
          
        }, [user])

    const getFormData = async ()=>{
        const result = await db.select().from(JsonForms)
        .where( and(  eq(JsonForms.id,params?.formId) , 
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress) ))
        setJsonResult(JSON.parse(result[0].jsonform))
       
    }


    



  return (
    <div className='p-10'>
        <h2 className=" flex gap-2 items-center my-5 cursor-pointer hover:font-bold "
            onClick={()=>router.back()}
        >
            <ArrowLeft/> Back
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 border rounded-lg shadow-md">Controller</div>
            <div className=" md:col-span-2 border rounded-lg p-5  flex items-center justify-center">
                <FormUi  jsonResult = {jsonResult} />
            </div>
        </div>
    </div>
  )
}

export default EditForm


