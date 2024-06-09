'use client'
import { db } from '@/dbConfigs'
import { JsonForms } from '@/dbConfigs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItems from './_components/FormListItems'

const Responses = () => {

    const {user} = useUser();
    const[formList , setFormList] = useState([]);

    const getFormList = async ()=>{
        const result = await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress ))
        .orderBy(desc(JsonForms.id))
        setFormList(result)
        
    }
    useEffect(() => {
       user && getFormList()
    }, [user])
    


  return formList && (
    <div  className=' p-10' >
        <h2 className=' font-bold text-3xl flex items-center justify-between'>Responses</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 items-center  lg:grid-cols-3'>
            {formList.map((form,index)=>(
                <div key={index}>
                    <FormListItems formData={form}  />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Responses