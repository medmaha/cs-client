import Image from "next/image"
import ResponsiveImage from "next/legacy/image"
import { useContext, useEffect, useState } from "react"
import { celesupBackendApi } from "../../../axiosConfig"

import { GlobalContext } from "../../../layouts/context"

import CSDateTime from "../../../libs/dateTime"
import Icon from "../../components/UI/Icon"
import UserCard from "../../components/UI/UserCard"
import CommentsWrapper from "../comments/CommentsWrapper"
import { Headers, Typography, Media, Interactions } from "./components"

export default function Post({ data }) {
    const [post, setPostData] = useState({})
    const [options, setOptions] = useState({
        showComments: false,
        updated: false,
    })

    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        updatePostData(data)
    }, [])

    useEffect(() => {
        function toggleComments() {
            const liked = post.likes?.find((user) => {
                if (user.id === globalContext.user?.id) return true
            })
            if (liked) {
                setOptions((prev) => {
                    return {
                        ...prev,
                        showComments: true,
                    }
                })
            }
        }
        if (options.updated) toggleComments()
    }, [post])

    async function updatePostData(_data) {
        const _post = {
            ..._data,
            created_at: new CSDateTime(_data.created_at).format(),
        }
        setPostData(_post)
        return true
    }

    async function sendHttpRequest(url, method = "get") {
        const form = new FormData()
        form.append("post_key", post.key)

        await celesupBackendApi[method](url, form)
            .then(async (res) => {
                await updatePostData(res.data)
            })
            .catch((err) => {})

        return true
        // postWS.send(JSON.stringify({ type: "POST_LIKE" }))

        // if (postData.author.id !== context.user.id) {
        //     context.webSocketMaster.send(
        //         JSON.stringify({
        //             type: "NOTIFY_USER",
        //             payload: {
        //                 user_id: postData.author.id,
        //             },
        //         }),
        //     )
        // }
    }

    async function handlePostLike() {
        const done = await sendHttpRequest("/posts/like", "post")
        setOptions((prev) => {
            return {
                ...prev,
                updated: true,
            }
        })

        // postWS.send(JSON.stringify({ type: "POST_LIKE" }))

        // if (postData.author.id !== context.user.id) {
        //     context.webSocketMaster.send(
        //         JSON.stringify({
        //             type: "NOTIFY_USER",
        //             payload: {
        //                 user_id: postData.author.id,
        //             },
        //         }),
        //     )
        // }
    }

    return (
        <>
            {post.key && (
                <div className="w-full min-h-[200px] max-w-[550px]">
                    <div className="flex w-full">
                        <div className="mr-[12px]  min-w-max">
                            <UserCard
                                btnElement={
                                    <div className="rounded-full outline-2 cs-outline w-[48px] h-[48px]">
                                        <Image
                                            className="rounded-full"
                                            width={48}
                                            height={48}
                                            style={{ objectFit: "cover" }}
                                            src={post.author.avatar}
                                            alt={post.author.username}
                                        />
                                    </div>
                                }
                                author={post.author}
                            />
                        </div>
                        <div className="flex flex-col mb-1 w-full">
                            <Headers data={post} />
                            <Typography data={post} />
                            <Media data={post} />
                            <Interactions
                                data={post}
                                options={options}
                                setOptions={setOptions}
                                globalContext={globalContext}
                                handlePostLike={handlePostLike}
                            />
                            <div className="hidden mobile:inline-block">
                                {options.showComments && (
                                    <CommentsWrapper
                                        post={post}
                                        options={options}
                                        setOptions={setOptions}
                                        globalContext={globalContext}
                                    />
                                )}
                                <div className="">
                                    <span className="cs-divider h-[2px]"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobile:hidden inline-block w-full">
                        {options.showComments && (
                            <CommentsWrapper
                                post={post}
                                options={options}
                                setOptions={setOptions}
                                globalContext={globalContext}
                            />
                        )}
                        <div
                            className={`${
                                !!options.showComments ? "" : "mt-2"
                            }`}
                        >
                            <span className="cs-divider h-[2px]"></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
