'use client'

import { registrationFormControls } from '@/utils/formControls'
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import InputComponent from "@/components/FormElements"
import { logger } from '@/utils/logger'

interface FormData {
    username: string,
    email: string,
    password: string
}

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-purple-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

const initForm: FormData = {
    username: '',
    email: '',
    password: ''
}

export default function Register() {
    const context = useContext(GlobalContext)

    const router = useRouter()

    if (context === null) {
        logger.error(`Please provide a context`)
        return (
            <div className='max-h-screen'>
                <div className="flex flex-col justify-center items-center pt-24 pb-0 mt-24 mr-auto xl:px-5">
                    <h1>Oops! Something went wrong on the developer's side. Please try again later.</h1>
                </div>
            </div>
        )
    }

    const [formData, setFormData] = useState(initForm)

    const isValid = () => {
        return formData && formData.username && formData.username.trim() !== '' 
            && formData.password && formData.password.trim() !== ''
            && formData.email && formData.email.trim() !== ''
                ? true : false
    }

    const handleRegister = async() => {
        console.log(formData)
    }

    return (
        <>
            <div className='max-h-screen'>
                <div className="flex flex-col justify-center items-center pt-4 pb-0 mt-24 mr-auto xl:px-5 lg:flex-row">
                    <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                        <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-gray-800 shadow-2xl rounded-xl relative z-10">
                                {/* Title */}
                                <p className="w-full text-4xl font-medium text-center font-consolas">
                                    Register
                                </p>
                                {/* Form */}
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        registrationFormControls.map(controlItem =>
                                            <InputComponent 
                                                key={controlItem.id}
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label} 
                                                value={formData[controlItem.id as keyof FormData]}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.id]: e.target.value
                                                    })}
                                                    
                                                }
                                            />
                                        )
                                    }

                                    <button
                                        disabled={!isValid()}
                                        onClick={handleRegister}
                                        className={styles.button}
                                    >
                                        Register
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        <p>Already have an account?</p>
                                        <button className={styles.button}
                                            onClick={() => router.push('/login')}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}