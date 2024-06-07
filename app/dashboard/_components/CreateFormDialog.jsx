'use client'
import { AiChatSession } from "@/aiConfig/aiModel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/dbConfigs";
import { JsonForms } from "@/dbConfigs/schema";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const CreateFormDialog = () => {

    const {user} = useUser();
   

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState();
    const [loading, setLoading] = React.useState();
    

    const route = useRouter();

    const PROMPT = ', On the basis of description please give form in json format with formTitle, formHeading with form having Form fields ,fieldName, fieldTitle , placeholder , fieldLabel and fieldType , field required in Json format '

    const handleCreate = async () => {
        setLoading(true)
        const result = await AiChatSession.sendMessage(`Desciption: ${value} ${PROMPT}`)

        if (result.response.text()) {
            const response = await db.insert(JsonForms)
            .values({
                jsonform: result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD/MM/yyyy')
            }).returning({id:JsonForms.id});

            if(response[0].id){
                route.push(`/edit-form/${response[0].id}`)
            }
            
            setLoading(false)
            toast.success('Form created successfully')
          

            
        }
        setLoading(false);
       
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)} >+ Create Form</Button>
            <Dialog open={open}  >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new form</DialogTitle>
                        <DialogDescription>
                            <Textarea
                                onChange={(e) => setValue(e.target.value)}
                                className='my-2' placeholder='Write a description about your form' />
                            <div className=" flex gap-2 items-center justify-end my-3 ">
                                <Button variant='destructive' onClick={() => setOpen(false)} >Cancel</Button>
                                <Button onClick={() => {
                                    
                                    handleCreate();
                                    
                                }} >
                                    {loading? <Loader2 className=" animate-spin" /> : 'Create' }
                                    </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateFormDialog;
