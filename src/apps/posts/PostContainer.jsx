import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { celesupBackendApi, celesupFrontendApi } from "../../../axiosConfig"
import { GlobalContext } from "../../../layouts/context"
import CSCookie from "../../../libs/cookies"
import { updateMoods } from "../../redux/app"
import Post from "./Post"

const COOKIES = CSCookie()

export default function PostContainer() {
    const { user, tokens, moods } = useContext(GlobalContext)

    const [posts, setPosts] = useState({})

    useEffect(() => {
        const _p = COOKIES.get("post")
        if (moods.updateFeeds === "post" && _p) {
            const post = JSON.parse(_p)
            const newPosts = { ...posts }

            var newPostData = [post]

            if (!!posts.data?.length) {
                newPostData = [...newPostData, ...posts.data]
            }

            setPosts({ ...newPosts, data: newPostData })

            updateMoods({ updateFeeds: null })
            COOKIES.del("post")
        }
    }, [moods])

    async function fetchPosts() {
        async function fetcher() {
            celesupBackendApi
                .get("/feeds")
                .then((response) => {
                    setPosts(response.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
        await fetcher()
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="flex items-center flex-col gap-[.5rem] mt-2 w-full">
            {posts.data?.map((post, idx, posts) => {
                return (
                    <span key={post.key} className="flex justify-center w-full">
                        <Post data={post} />
                        {idx !== posts.length - 1 && <></>}
                    </span>
                )
            })}
        </div>
    )
}
