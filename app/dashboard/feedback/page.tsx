"use client"
import React from 'react'
import { useState } from 'react'
import EmailJS from '@emailjs/browser'
import { useRouter } from 'next/navigation'

const page = () => {
    const [feedback, setFeedback] = useState("");
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const submit = async () => {
       try {
        await EmailJS.send(
            "Freelance",
            "template_vs7edoa",
            {
                name: `Message sent by ${name.length > 0 ? name : "Anonymous"} from freelancing project`,
                message: feedback
            },
            {publicKey: "_zpC8Ncqw-10JXUpC"}
        )
        console.log("successfully sent")
        router.push("/dashboard")
       } catch (error: any) {
        console.log(error)
        setError(error)
       }
    }
  return (
    <section className='min-h-screen bg-white text-black'>
        <div className="ml-10">
        <h1 className='text-3xl mt-10 text-center'>Feedback</h1>
        <div className='block mt-14'>
            <label className='block text-2xl'>Your name</label>
            <input className='block h-12 mt-3 pl-2 border rounded-md w-2/3 md:1/3' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='block mt-14'>
            <label className='block text-2xl'>Send your feedback on this app.</label>
            <textarea className='block border w-2/3 p-2 rounded-2xl mt-3 md:1/3' rows={10} name="feedback" id="" placeholder="Enter your feedback here..." value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
        </div>
        {error ? (<p>{error}</p>) : ""}
        <button
          className="bg-gray-400 hover:bg-gray-300 py-1/2 px-3 mx-auto mt-14 items-center flex rounded-sm cursor-pointer"
          onClick={submit}
        >Send</button>
        </div>
    </section>
  )
}

export default page