'use client'

import { getChapterComments } from '@/services/comic/manga/comments'
import { User } from '@/utils/interface'
import { Comment, Comments } from '@/utils/types'
import React, { useEffect, useState } from 'react'

const Comments = (props: { isAuth: boolean, user: User, mangaId: string, chapterId: string }) => {
    const { isAuth, user, mangaId, chapterId } = props

    const [comments, setComments] = useState<Comments>(null)
    const [userComment, setUserComment] = useState<string>(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value)
    }

    const getComments = async() => {
        const result = await getChapterComments(mangaId, chapterId) as Comments
        setComments(result)
    }

    useEffect(() => {
        getComments()
    }, [props])

    useEffect(() => {
        console.log(comments?.comments)
    }, [comments])

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
                    comments?.comments.map((comment: Comment) => {
                        // const user = dummyUsers.find(user => user.id === comment.userId)
                        return (
                            <>
                                <div className="flex flex-col mt-4 border p-4 rounded-md" key={comment.id}>
                                    <p className='text-sm text-gray-600 text-bold'>UserName</p>
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