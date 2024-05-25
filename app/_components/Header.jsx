'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {

  const {user , isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className=" p-5 border-b-2   shadow-sm ">
        <div className=' flex items-center justify-between' >
            <Image src={'/logo.svg'} width={180} height={50} alt='logo' />
            {isSignedIn?
            <div className=" flex items-center gap-5">
              <Button variant='outline' >Dashboard</Button>
              <UserButton/>
            </div>
            :
            <div className="">
              <Button onClick={()=>{
                router.push('/sign-in')
              
              }}  >Sign in</Button>
            </div>
          }
            
        </div>
        
    </div>
  )
}

export default Header