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
import React from "react";
import EditField from "./EditField";


const FormUi = ({ jsonResult, onUpdate, handleDelete, selectedTheme, editTable = true }) => {



  return (
    <div className="border p-5 md:w-[600px] rounded-lg " data-theme={selectedTheme}>
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
              <Select>
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
              <RadioGroup>
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label} />
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
                    <Checkbox />
                    <h2>{item.fieldName}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center ">
                  <Checkbox />
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
      <button className=" btn btn-primary">Submit</button>
    </div>
  );
};

export default FormUi;
