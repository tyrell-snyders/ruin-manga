import { User } from "@/utils/interface"
import { cookies } from "next/headers"

export const logout = async() => {
    'use server'
    cookies().delete('user')
}

export const login = async() => {
    'use server'


}