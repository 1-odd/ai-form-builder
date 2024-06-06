import React from 'react'
import CreateFormDialog from './_components/CreateFormDialog'

const page = () => {
  return (
    <div className='max-h-screen p-10'>
        <h1 className=' font-bold text-3xl flex items-center justify-between' >
          Dashboard
          <CreateFormDialog/>
        </h1>
    </div>
  )
}

export default page