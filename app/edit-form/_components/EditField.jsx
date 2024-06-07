import {  Edit, Trash } from 'lucide-react'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
  

const EditField = ({defaultValue , handleUpdate , handleDelete}) => {


    const [label, setLabel] = React.useState(defaultValue?.fieldLabel);
    const [placeholder , setPlaceholder] = React.useState(defaultValue?.placeholder);

    
  return (
    <div className='flex gap-2'>
        
        

        <Popover>
            <PopoverTrigger>
                <Edit className='h-4 w-5 text-gray-500' />
            </PopoverTrigger>
            <PopoverContent>
                <h2>Edit Fields</h2>
                <div>
                    <label className='text-xs'>
                        label name
                    </label>
                    <Input type='text' defaultValue={defaultValue.fieldLabel} 
                        onChange = {(e)=>setLabel(e.target.value)}
                    />
                </div>
                <div>
                    <label className='text-xs'>
                        placeholder name
                    </label>
                    <Input type='text' defaultValue={defaultValue.placeholder} 
                        onChange = {(e)=>setPlaceholder(e.target.value)}
                    />
                </div>
                <Button className=' mt-3' size='sm' onClick={()=> handleUpdate({label , placeholder}) }  >Update</Button>
            </PopoverContent>
        </Popover>


        

        <AlertDialog>
            <AlertDialogTrigger>
                <Trash   className='h-4 w-5 text-red-500' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you  sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your field
                    and remove your field data from our Database.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction   onClick={()=>handleDelete()}  >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    </div>
  )
}

export default EditField