'use client'
import { db } from '@/dbConfigs';
import { JsonForms } from '@/dbConfigs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';

const FormsList = () => {

  const {user} = useUser();

  const [formList , setFormList] = useState([])

  useEffect(() => {
   user && getFormList()
  }, [user])
  

  const getFormList = async ()=>{

    const result = await db.select().from(JsonForms)
    .where(eq(JsonForms.createdBy , user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(JsonForms.id));
    setFormList(result);
    

  }
  

  return (
    <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5 '>

      {formList?.map((form , index)=>(
        <div key={index} className="">
          <FormListItem formData={form} refreshData={()=>getFormList()} />
        </div>
      ))}

    </div>
  )
}

export default FormsList