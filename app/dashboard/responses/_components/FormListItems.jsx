
import { Button } from '@/components/ui/button';
import { db } from '@/dbConfigs';
import { userResponses } from '@/dbConfigs/schema';
import { eq } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import * as XLSX from  'xlsx'


const FormListItems = ({formData}) => {

    const jsonForm = JSON.parse(formData?.jsonform);
    const[loading , setLoading] = useState(false)

    
    let jsonData = [];
    const exportData = async ()=>{
        setLoading(true)
        const res = await db.select().from(userResponses)
        .where(eq(userResponses.formRef , formData.id))
        
        if(res){
            res.forEach((item)=>{
                const jsonDataItem = JSON.parse(item?.jsonResponse);
                jsonData.push(jsonDataItem);
            })
            
        }
        
        exportToExil(jsonData);
        setLoading(false); 
    }

    const exportToExil = async (jsonData)=>{
        const ws = XLSX.utils.json_to_sheet(jsonData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Responses');
        XLSX.writeFile(wb, jsonForm?.formTitle+' responses.xlsx')
    }


   

  return (
    <div className='border shadow-sm rounded-lg p-4 '>

        <h2 className='font-medium text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className=' text-sm text-gray-600 '>{jsonForm?.formHeading}</h2>
        <hr className='my-4' />
        <div className='flex  items-center justify-center  '>

            <Button className='' size='sm' 
                onClick={()=>exportData()}
            > {loading? <Loader2 className=' animate-spin' />: 'Export Responses ' }</Button>

        </div>

    </div>
  )
}

export default FormListItems