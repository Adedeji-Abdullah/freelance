import React from 'react'

const page = () => {
  return (
    <section>
        <div>
            <form action="">
                <div>
                    <label htmlFor="">First name</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Last name</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Phone number</label>
                    <input type="number" />
                </div>
                <div>
                    <label htmlFor="">CV</label>
                    <input type="text" />
                </div>
                
            </form>
        </div>
    </section>
  )
}

export default page