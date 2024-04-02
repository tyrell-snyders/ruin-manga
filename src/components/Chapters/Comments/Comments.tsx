'use client'

import { User } from '@/utils/interface'
import { Comment } from '@/utils/types'
import React, { useEffect, useState } from 'react'

const dummyComments: Comment[] = [
    {
        id: 1,
        userId: 1,
        downvotes: 30,
        upvotes: 0,
        comment: 'This chapter is great!',
        chapterId: 'hsiifnvods993nklg',
        createdAt: Date.now().toLocaleString(),
        updatedAt: ''
    },     
    {
        id: 2,
        userId: 2,
        downvotes: 20,
        upvotes: 10,
        comment: 'This chapter sucked!!',
        chapterId: 'hsiifnvods993nklg',
        createdAt: Date.now().toLocaleString(),
        updatedAt: ''
    },
    {
        id: 3,
        userId: 3,
        downvotes: 10,
        upvotes: 190,
        comment: 'Why? Just why?',
        chapterId: 'hsiifnvods993nklg',
        createdAt: Date.now().toLocaleString(),
        updatedAt: ''
    }
]

const dummyUsers: User[] = [
    {
        id: 1,
        username: 'Dark_Soul',
        email: 'dark_soul@gmail.com',
    },
    {
        id: 2,
        username: 'Dark_Soul2',
        email: 'dark_soul2@gmail.com',
    },
    {
        id: 3,
        username: 'Dark_Soul3',
        email: 'dark_soul3@gmail.com',
    }
]

const Comments = (props: { isAuth: boolean, user: User }) => {
    const { isAuth, user } = props

    const [comments, setComments] = useState<Comment[]>(null)
    const [userComment, setUserComment] = useState<string>(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value)
    }

    return (
        <div className='border border-gray-200 rounded p-10 mt-12'>
            <h1 className='text-bold text-2xl'>Comments</h1>
            <hr />
            <div className="mt-2">
                {
                    isAuth? (
                        <>
                            <div>
                                <textarea 
                                    className='w-full rounded-md p-2 text-gray-800' placeholder='Write a comment...' 
                                    value={userComment} onChange={handleChange}
                                ></textarea>
                                <button className='text-sm text-gray-500 border border-green-400 p-4 rounded-md bg-green-400'>Post</button>
                            </div>
                        </>
                    ) : (
                        <button className='text-sm text-blue-500'>Login to Comment</button>
                    )
                }
            </div>
            <div className="flex flex-col">
                {/* TODO: Get Comments*/}
                {
                    dummyComments.map((comment: Comment) => {
                        const user = dummyUsers.find(user => user.id === comment.userId)
                        return (
                            <>
                                <div className="flex flex-col mt-4 border p-4 rounded-md" key={comment.id}>
                                    <p className='text-sm text-gray-600 text-bold'>{user?.username}</p>
                                    <p>{comment.comment}</p>
                                    <div>
                                        <button>Up</button>
                                        <button>Down</button>
                                    </div>
                                </div>
                                <hr className='mt-4'/>
                            </>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Comments