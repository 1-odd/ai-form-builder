import { Button } from '@/components/ui/button'
import { Edit2,  Share2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/dbConfigs'
import { JsonForms, userResponses } from '@/dbConfigs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'
  

const FormListItem = ({formData , refreshData}) => {

    const {user} = useUser();
    const jsonForm = JSON.parse(formData.jsonform);
    
    const deleteForm = async () => {
      try {
          // Delete related records from userResponses table
          const deleteResponsesRes = await db
              .delete(userResponses)
              .where(eq(userResponses.formRef, formData?.id));
  
          // Check if userResponses deletion was successful
          if (deleteResponsesRes) {
              // Delete the record from jsonForms table
              const deleteFormRes = await db
                  .delete(JsonForms)
                  .where(
                      and(
                          eq(JsonForms.id, formData?.id),
                          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                      )
                  );
  
              // Check if jsonForms deletion was successful
              if (deleteFormRes) {
                  toast.success('Form deleted successfully!!');
                  refreshData();
              } else {
                  toast.error('Failed to delete form.');
              }
          } else {
              toast.error('Failed to delete related user responses.');
          }
      } catch (error) {
          console.error('Error deleting form:', error);
          toast.error('An error occurred while deleting the form.');
      }
  };
    
  return (
    <div className='border shadow-sm rounded-lg p-4'>


            <div className="flex gap-2 justify-between">
                <h2></h2>
                

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Trash2 className='h-5 w-5 text-red-500  cursor-pointer
                     hover:text-red-600 hover:scale-110 transition-all  '
                     
                     />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.This will permanently delete your form
                            and all the data it contains.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={()=>deleteForm()}
                        >Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>



        <h2 className='font-medium text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className=' text-sm text-gray-600 '>{jsonForm?.formHeading}</h2>
        <hr className='my-4' />
        <div className='flex items-center justify-between'>

        <RWebShare
        data={{
          text: jsonForm?.formHeading,
          url: process.env.NEXT_PUBLIC_BASE_URL+'/live-preview/'+formData?.id,
          title: jsonForm?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button size='sm' variant='outline' className='flex gap-2' > 
        <Share2 className='h-5 w-5' />Share</Button>
        
      </RWebShare>

            


            <Link href={'/edit-form/'+ formData?.id} >
            <Button size='sm' className='flex gap-2' > <Edit2 className='h-5 w-5' />Edit</Button>
            </Link>

        </div>

    </div>
  )
}

export default FormListItem