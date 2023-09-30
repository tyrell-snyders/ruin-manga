'use client'

import { loginFromControls } from "@/utils/formControls"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import Cookies from "js-cookie"
import InputComponent from "@/components/FormElements"

interface FormData {
    email: string;
    password: string;
}

const initForm: FormData = {
    email: '',
    password: ''
}

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-purple-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

export default function Login() {
    const context = useContext(GlobalContext)

    useEffect(() => {
        if (context?.isAuth) router.push('/')
    }, [context?.isAuth])

    const router = useRouter()

    const [formData, setFormData] = useState(initForm)

    const isValid = () => {
        return formData && formData.email && formData.email.trim() !== '' 
            && formData.password && formData.password.trim() !== '' 
                ? true : false
    }

    const handleLogin = async() => {

    }


    return (
        <div className="max-h-screen">
            <div className="flex flex-col items-center justify-between pt-24 pb-0 mt-24 mr-auto xl:px-5 lg:flex-roww">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-gray-800 shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-consolas">
                                Login
                            </p>
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {
                                    loginFromControls.map(controlItem => 
                                            controlItem.componnentType === 'input' ? (
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
                                        ) : null    
                                    )
                                }
                                <button
                                    disabled={!isValid()}
                                    onClick={handleLogin}
                                    className={styles.button}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}