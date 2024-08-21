'use client'

import { loginFromControls } from "@/utils/formControls"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import InputComponent from "@/components/FormElements"
import { LoginForm, User } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { loginUser } from "@/services/auth/login/index.service"
import { useCookies } from 'react-cookie'
import { DecodeUser } from "@/utils/types"
import { login, details } from "@/components/auth/login"

const initForm: LoginForm = {
    username: '',
    pass: ''
}

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-purple-600 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

export default function Login() {
    const context = useContext(GlobalContext)

    if (context === null) {
        logger.error("No context")
        return null;
    }

    const { user, setUser, isAuth, setIsAuth } = context

    useEffect(() => {
        if (isAuth) router.push('/')
    }, [isAuth])

    const router = useRouter()

    const [formData, setFormData] = useState(initForm)
    const [cookies, setCookie] = useCookies(['token']);

    const isValid = () => {
        return formData && formData.username && formData.username.trim() !== '' 
            && formData.pass && formData.pass.trim() !== '' 
                ? true : false
    }


    const parseJWT = (token: string) => {
        const base64Url = token.split('.')[1]
        const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        return JSON.parse(base64)
    }

    const handleLogin = async() => {
        try {
            const res = await loginUser(formData)
            if (res?.success) {
                const uData = parseJWT(res?.data.token) as DecodeUser
                const userData =  {
                    id: uData.id,
                    username: uData.usernmae,
                    email: uData.email,
                    avatar: uData.avatar
                } as User
                setUser(userData)
                
                // Create user session with cookies
                setCookie('token', res?.data.token)

                login(res?.data.token as string)
                details()

                // Add user data to local storage
                localStorage.setItem('user', JSON.stringify(userData))

                // Indicate that the user is authorized
                setIsAuth(true)
            }
        } catch (e) {
            if (e instanceof Error)
                logger.error(e.message)
        }
    }

    return (
        <div className="max-h-screen">
            <div className="flex flex-col items-center justify-between pt-24 pb-0 mt-24 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-gray-800 shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-consolas">
                                Login
                            </p>
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {
                                    loginFromControls.map(controlItem => 
                                            <InputComponent 
                                                key={controlItem.id}
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                componentType={controlItem.componnentType}
                                                label={controlItem.label} 
                                                value={formData[controlItem.id as keyof LoginForm]}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
                                    onClick={handleLogin}
                                    className={styles.button}
                                >
                                    Login
                                </button>
                                <div className="flex flex-col gap-2">
                                    <p>New to website ?</p>
                                    <button className={styles.button}
                                        onClick={() => router.push('/register')}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}