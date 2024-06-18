'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Themes from '@/app/_data/Theme'
import Gradients from '@/app/_data/GradientBg'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'


const Controller = ({selectedTheme , selectedBackground , setUserSignIn}) => {

  const [showMore , setShowMore] = React.useState(6);

  return (
    <div>

      <h2 className='my-2'>Select Themes</h2>

      <Select  onValueChange={(value)=>selectedTheme(value)} >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          
          {Themes.map((item,index)=>(
            <div key={index}>
                <SelectItem value={item.theme}>
                  <div className='flex gap-2 items-center'>
                    <div className=' h-5 w-5 ' style={{backgroundColor:item.primary}}></div>
                    <div className=' h-5 w-5 ' style={{backgroundColor:item.secondary}}></div>
                    <div className=' h-5 w-5 ' style={{backgroundColor:item.accent}}></div>
                    <div className=' h-5 w-5 ' style={{backgroundColor:item.neutral}}></div>
                    {item.theme}
                  </div>
                </SelectItem>
            </div>
          ))}


          
        </SelectContent>
      </Select>

      <h2 className='mt-8 my-3'>Background </h2>

      <div className='grid grid-cols-3 gap-5 '>
        {Gradients.map((item,index)=> (index<showMore)&& (
          <div key={index} 
          onClick={()=>selectedBackground(item.gradient)}
          className="w-full h-[70px] rounded-lg cursor-pointer
           hover:border-black hover:border-2 flex items-center justify-center border" 
          style={{background:item.gradient}} >
            {index==0 && 'None'}
          </div>
        ))}
        
      </div>

      <Button 
      variant={'ghost'} size='sm' className='w-full mt-4'
        onClick={()=>setShowMore(showMore>6?6:20)}
      >{showMore>6 ? 'Show less' : 'Show more'}</Button>

      <div className='my-3 flex items-center'>
        <h2 className='text-xl '>Note: <span className='text-sm text-gray-700'>You can choose any theme and background for your form 
          it will remain same after the preview of the form.</span></h2>
      </div>

      <div className='flex items-center gap-3 my-4 mt-10'>
        <Checkbox onCheckedChange={(e)=>setUserSignIn(e)} />
         <h2>Enable user authentication for submit the response.</h2>
      </div>

    </div>
  )
}

export default Controller