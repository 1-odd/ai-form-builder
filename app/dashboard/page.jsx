import React from 'react'
import CreateFormDialog from './_components/CreateFormDialog'
import FormsList from './_components/FormsList'

const page = () => {
  return (
    <div className='max-h-screen p-10  ' >
        <h2 className=' font-bold text-3xl flex items-center justify-between' >
          Dashboard
          <CreateFormDialog/>
        </h2>
        
        <div>
          <FormsList />
        </div>
    </div>
  )
}

export default page