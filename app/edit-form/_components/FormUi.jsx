import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import EditField from "./EditField";
import { db } from "@/dbConfigs";
import { userResponses } from "@/dbConfigs/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";


const FormUi = ({ jsonResult, onUpdate, handleDelete, selectedTheme, editTable = true }) => {

  const {user} = useUser();
  let formRef = useRef();

  const [formData, setFormData] = React.useState()

  const handleInputChange = (e)=>{
    
    const {name , value} = e.target;
   
    setFormData({...formData,[name]:value})
  }

  const handleSelectChange = (name , value)=>{
    setFormData({...formData,[name]:value})
  }
  const handleCheckboxChange = (fieldName,itemName,value)=>{
    const list=formData?.[fieldName]?formData?.[fieldName]:[];
   
    if(value)
    {
      list.push({
        label:itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }else{
    const result=  list.filter((item)=>item.fieldName==itemName);
    setFormData({
      ...formData,
      [fieldName]:result
    })
    }
  }

  const onFormSubmit = async (e)=>{
    e.preventDefault()
    const result = await db.insert(userResponses)
    .values({
      jsonResponse:formData,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD/MM/yyy')
    })
    if(result){
      toast.success('Response submitted!!!!')
      formRef.reset();
    }
  }



  return (
    <form 
    ref={(e)=>formRef=e}
    onSubmit={onFormSubmit}
    className="border p-5 md:w-[600px] rounded-lg " data-theme={selectedTheme} >
      <h2 className="font-bold text-center text-2xl">
        {jsonResult?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-600 text-center">
        {jsonResult?.formHeading}
      </h2>

      {jsonResult?.formFields?.map((field, index) => (
        <div key={index} className=" flex items-center gap-2 ">
          {field?.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              <Select required={field?.required}
               onValueChange={(value)=>handleSelectChange(field?.fieldName , value)} >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className=" my-3 w-full">
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              <RadioGroup required={field?.required}  >
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label}
                      onClick={()=>handleSelectChange(field?.fieldName , item.label)}
                    />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox
                      onCheckedChange={(v)=>handleCheckboxChange(field?.fieldLabel ,item?.fieldName , v)}
                    />
                    <h2>{item.fieldName}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center ">
                  <Checkbox 
                    required={field?.required}
                  />
                  <h2>{field?.fieldLabel}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">
                {field?.fieldLabel}
              </label>
              <Input className='bg-transparent'
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                required={field?.required}
                onChange={(e)=>handleInputChange(e)}
              />
            </div>
          )}
          {editTable && <div>
            <EditField defaultValue={field}
              handleUpdate={(value) => onUpdate(value, index)}
              handleDelete={() => handleDelete(index)} />
          </div>}
        </div>

      ))}
      <button type="submit" className=" btn btn-primary">Submit</button>
    </form>
  );
};

export default FormUi;
