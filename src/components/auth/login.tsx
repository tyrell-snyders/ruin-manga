'use server';

import { User } from "@/utils/interface"
import { logger } from "@/utils/logger"
import { cookies } from "next/headers"

// export interface LoggedInUser {
//     login(token: string): void
// }

// export class LoggedInUser  {
//     // const cookieUser = cookies().get('token')?.value

//     // let LoggedInUser: User | null = cookieUser ? JSON.parse(cookieUser) : null

//     // const logout = async() => {
//     //     'use server'
//     //     cookies().delete('user')
//     // }

//     login = (token: string) => {
//         cookies().set('token', token);
//         logger.info(`Logged in with token: ${token}`);
//     };


//     // if (!LoggedInUser)
//     //     return (
//     //         <div>
//     //             <h1>Not logged in!!</h1>
//     //         </div>
//     //     )

//     // return (
//     //     <div>
//     //         <p>Logged In:</p>
//     //         <h1>{LoggedInUser.username}</h1>
//     //     </div>
//     // )
// }

// export const LoggedInUser = {
//   login(token: string): void {
//     cookies().set('token', token);
//     logger.info(`Logged in!!`);
//   },

//   details(): void {
//     const token = cookies().get('token')
//     logger.info(`Details: ${token}`);
//     console.log(token)
//   }
// };

export const login = (token: string) => {
  cookies().set('token', token);
  logger.info(`Logged in!!`);
}

export const details = () => {
    const token = cookies().get('token')
    logger.info(`Details: ${token}`);
    console.log(token)
}