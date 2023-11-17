import { User } from "@/utils/interface"
import { cookies } from "next/headers"

export const LoggedInUser = async() => {
    const cookieUser = cookies().get('user')?.value

    let LoggedInUser: User | null = cookieUser ? JSON.parse(cookieUser) : null

    const logout = async() => {
        'use server'
        cookies().delete('user')
    }

    if (!LoggedInUser)
        return (
            <div>
                <h1>Not logged in!!</h1>
            </div>
        )

    return (
        <div>
            <p>Logged In:</p>
            <h1>{LoggedInUser.username}</h1>
        </div>
    )
}