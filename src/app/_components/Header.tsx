import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
const menuOptions=[
    {
        name:'Home',
        path:'/'
    },
    {
        name:'Pricing',
        path:'/pricing'
    },
    {
        name:'Contact us',
        path:'/contact-us'
    }
]
export default function Header() {
    const {user}=useUser()
  return (
    <div className='flex justify-between p-4 items-center'>
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt='logo' width={30} height={30}></Image>
            <h2 className='font-bold text-2xl'>Trip Bandhu</h2>
        </div>
        <div className='flex gap-8 items-center'>
            {menuOptions.map((menu,index)=>(
                <Link href={menu.path}>
                    <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        {!user ?<SignInButton mode='modal'>
            <Button>Get Started</Button>
        </SignInButton> :
        <Link href={'/create-new-trip'}>
            <Button>Create new trip</Button>
        </Link>
        }
        
    </div>
  )
}
