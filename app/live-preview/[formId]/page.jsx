'use client'
import FormUi from '@/app/edit-form/_components/FormUi';
import { db } from '@/dbConfigs';
import { JsonForms } from '@/dbConfigs/schema';
import {  eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const LivePreview = ({params}) => {

    const [record , setRecord] = useState();
    const [jsonResult , setJsonResult] = useState([]);
   

    useEffect(()=>{
           
        params && getFormData(); 
    },[params])

    const getFormData = async ()=>{
        const result = await db.select().from(JsonForms)
        .where(  eq(JsonForms.id,Number(params?.formId)) )
        
        
        setRecord(result[0])
        setJsonResult(JSON.parse(result[0].jsonform))
    }


  return (
    <div className='p-10 flex items-center justify-center' style={{
        backgroundImage:record?.background,
    }}>
        
        <FormUi
            jsonResult={jsonResult}
            onUpdate={()=>console.log('update')}
            handleDelete={()=>console.log('delete')}
            selectedTheme={record?.theme}
            selectedBackground={record?.background}
            editTable={false}
            formId={record?.id}
        />
        <Link href={`/`} className='flex gap-2 items-center bg-black text-white px-3 py-2 
        rounded-full fixed  bottom-5 left-5 cursor-pointer' 
        >
            <Image alt='My logo' src={'/logo.png'} width={30} height={30} />
            Build your own AI form
        </Link>
    </div>
  )
}

export default LivePreview