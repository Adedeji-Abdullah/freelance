"use client"
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()

    useEffect(() => {
        const resp = async () => {
          const accessToken = localStorage.getItem("accessToken")
          const data = await fetch(`http://localhost:5000/authorization/${accessToken}`)
          if(!accessToken){
            router.push("/login")
          }
          const result = await data.json()
          console.log(result)
          if(!result.message){
            router.push("/login")
          }
        }
        resp()
      }, [])

  return (
    <section>
        <div>
            <form action="">
                <div>
                    <label htmlFor="">First name</label>
                    <input type="text" className='border' />
                </div>
                <div>
                    <label htmlFor="">Last name</label>
                    <input type="text" className='border' />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" className='border' />
                </div>
                <div>
                    <label htmlFor="">Phone number</label>
                    <input type="number" className='border' />
                </div>
                <div>
                    <label htmlFor="">CV</label>
                    <input type="text" className='border' />
                </div>
                <div>
                    <label htmlFor="">picture</label>
                    <input type="file" className='border rounded-full' accept='image/jpeg,image/png,image/webp' />
                </div>               
            </form>
        </div>
    </section>
  )
}

export default page