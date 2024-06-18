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
import { SignInButton,  useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FormUi = ({ jsonResult, onUpdate, handleDelete, selectedTheme, editTable = true,  formId = 0 , enabledUserSignIn=false}) => {
  const { user , isSignedIn } = useUser();
  let formRefe = useRef(null);

  

  // Check for formFields or form in jsonResult
  const fields = jsonResult?.formFields || jsonResult?.form ;

  

  const [formData, setFormData] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item) => item.fieldName !== itemName);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault()
    

    
      console.log('submit')
      const result=await db.insert(userResponses)
      .values({
        jsonResponse:formData,
        createdAt:moment().format('DD/MM/yyy'),
        createdBy:user?.primaryEmailAddress?.emailAddress,
        formRef:formId
      })

        if(result)
        {
          formRefe.current.reset();
          toast('Response Submitted Successfully !')
        }
        else{
          toast('Error while saving your form !')

        }
    
  };

  
  

  return (
    <form
      ref={formRefe}
      onSubmit={  onFormSubmit}
      className="border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
    >
      <h2 className="font-bold text-center text-2xl">{jsonResult?.formTitle}</h2>
      <h2 className="text-sm text-gray-600 text-center">{jsonResult?.formHeading}</h2>

      {fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field?.fieldType === "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.fieldLabel}</label>
              <Select
                required={field?.required ? field?.required : field?.fieldRequired}
                onValueChange={(value) => handleSelectChange(field?.fieldName, value)}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                {field.options.map((item, index) => (
                    <SelectItem key={index} value={item.label?item.label:item}>{item.label?item.label:item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.fieldLabel}</label>
              <RadioGroup required={field?.required ? field?.required : field?.fieldRequired}>
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item.label}
                      id={item.label}
                      onClick={() => handleSelectChange(field?.fieldName, item.label)}
                    />
                    <Label htmlFor={item?.label}>{item?.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.fieldLabel}</label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox
                      onCheckedChange={(v) => handleCheckboxChange(field?.fieldName, item.label?item.label:item , v)}
                    />
                    <h2>{item.label?item.label:item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field?.required ? field?.required : field?.fieldRequired} />
                  <h2>{field?.fieldLabel}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.fieldLabel}</label>
              <Input
                className="bg-transparent"
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                required={field?.required ? field?.required : field?.fieldRequired}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          )}
          {editTable && (
            <div>
              <EditField
                defaultValue={field}
                handleUpdate={(value) => onUpdate(value, index)}
                handleDelete={() => handleDelete(index)}
              />
            </div>
          )}
        </div>
      ))}

      {!enabledUserSignIn?
        <button type="submit" className="btn btn-primary">
        Submit
      </button>:
        isSignedIn ?
        <button type="submit" className="btn btn-primary">
          Submit
        </button>:
          <Button>
            <SignInButton mode="modal" >Sign in before submit</SignInButton>
          </Button>
        }
      
    </form> 
  );
};

export default FormUi;
