'use client'
import { db } from '@/dbConfigs'
import { JsonForms } from '@/dbConfigs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft,  Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'

const EditForm = ({params}) => {



    const [jsonResult , setJsonResult] = React.useState([])
    const [updateTrigger , setUpdateTrigger] = React.useState();
    const [record , setRecord] = useState();
    const [selectedTheme , setSelectedTheme] = useState('light');
    const [selectedBackground , setSelectedBackground] = useState();
   
    const {user} = useUser();
    const router = useRouter();
    

    const fields = jsonResult?.formFields || jsonResult?.form ;

    useEffect(() => {
      
       user && getFormData();
          
        }, [user])

    const getFormData = async ()=>{
        const result = await db.select().from(JsonForms)
        .where( and(  eq(JsonForms.id,params?.formId) , 
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress) ))
        setRecord(result[0])
        setJsonResult(JSON.parse(result[0].jsonform))
        setSelectedTheme(result[0].theme)
        setSelectedBackground(result[0].background)
       
    }
   

    useEffect(() => {
        if(updateTrigger){
            setJsonResult(jsonResult);
            updateFormDb();
        }
        
    }, [updateTrigger])
    


    const onFieldUpdate = (value,index) =>{
        
      
        fields[index].fieldLabel = value.label;
        fields[index].placeholder = value.placeholder;
        setUpdateTrigger(Date.now())
    }



    const updateFormDb = async  ()=>{
        const result = await db.update(JsonForms)
        .set({
            jsonform: jsonResult
        }).where(and(eq(JsonForms.id , record.id) ,
         eq( JsonForms.createdBy , user?.primaryEmailAddress?.emailAddress)  ))

         if(result){
            toast.success('Form updated successfully');
         }

         
    }

    const onDelete = (indexToRemove) =>{
        
        const result = fields.filter((item,index)=>index != indexToRemove )
        if(jsonResult.formFields){
            jsonResult.formFields = result;
        }else{
            jsonResult.form = result;
        }
        setUpdateTrigger(Date.now());
        if(result){
            toast.success('Form field deleted successfully');
         }
    }

    const updateControllerFields = async(value,field) =>  {
        const result = await db.update(JsonForms)
        .set({
            [field]: value
        }).where(and(eq(JsonForms.id , record.id) ,
         eq( JsonForms.createdBy , user?.primaryEmailAddress?.emailAddress)  ))

         if(result){
            toast.success('Form updated successfully');
         }
    }
   
  return (
    <div className='p-10'>
        <div className=" flex items-center justify-between">


        
            <h2 className=" flex gap-2 items-center my-5 cursor-pointer hover:font-bold "
                onClick={()=>router.back()}
            >
                <ArrowLeft/> Back
            </h2>
            <div className='flex gap-2 '>
               <Link href={'/live-preview/'+record?.id} target='_blank' > <Button className ='flex gap-2' > <SquareArrowOutUpRight className='h-5 w-5' />
                Preview</Button> </Link>

                <RWebShare
                        data={{
                        text: jsonResult?.formHeading,
                        url: process.env.NEXT_PUBLIC_BASE_URL+'/live-preview/'+record?.id,
                        title: jsonResult?.formTitle,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button className ='flex gap-2 bg-green-600 hover:bg-green-800' > 
                        <Share2 className='h-5 w-5' />  Share</Button>
                        
                </RWebShare>

                
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="p-5 border rounded-lg shadow-md">
                <Controller 
                selectedTheme={(value)=>{

                    updateControllerFields(value,'theme')
                    setSelectedTheme(value)

                }}
                selectedBackground={(value)=>{
                    updateControllerFields(value,'background')
                    setSelectedBackground(value)
                }}
                setUserSignIn = {(value)=>{
                    updateControllerFields(value,'enableUserSignIN')
                }}
                />

            </div>


            <div className="  md:col-span-2 border rounded-lg p-5  flex items-center justify-center"
            style={{backgroundImage:selectedBackground}}
            >
                {record && <FormUi 
                 jsonResult = {jsonResult}
                 onUpdate={onFieldUpdate}
                 handleDelete={(index)=> onDelete(index)}
                 selectedTheme={selectedTheme}
                 formId={record?.id}
                 enabledUserSignIn = {record?.enableUserSignIn}
                 />}
            </div>
        </div>
    </div>
  )
}

export default EditForm


