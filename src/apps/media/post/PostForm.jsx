import { GlobalContext } from "../../../../layouts/context"
import Textarea from "../../../components/UI/Textarea"
import HashtagField from "../../../components/UI/HashtagField"

import { useState, useEffect, useContext, useRef } from "react"

import { useSelector, useDispatch } from "react-redux"
import { updateForm, updatePages } from "../../../redux/createPost"

// import fileUploader from "./uploader"
import { PostContext } from "./CreatePost"
import Input from "../../../components/UI/Input"
import Image from "next/image"
import Icon from "../../../components/UI/Icon"

const PostForm = () => {
    const dispatch = useDispatch()
    const postFormWrapperRef = useRef()
    const globalContext = useContext(GlobalContext)
    const postContext = useContext(PostContext)
    const { form } = useSelector((state) => state.createPost)
    const [addHashtag, setAddHashTag] = useState(form.hashtags)

    useEffect(() => {
        postFormWrapperRef.current.children[0].focus()
        dispatch(
            updatePages({
                prev: { from: null, value: null },
                current: { from: null, value: "FORM" },
                next: { from: "FORM", value: null },
            }),
        )
    }, [])

    async function uploader({ currentTarget }) {
        const type = currentTarget.dataset.file
        // const [filetype, file] = await fileUploader(type)
        // dispatch(
        //     updateForm({
        //         [filetype]: file,
        //     }),
        // )
        // postContext.dispatcher("PHOTO")
    }

    function handleFormChange({ target }) {
        dispatch(
            updateForm({
                [target.name]: target.value,
            }),
        )
    }

    return (
        <div className="relative flex flex-col justify-between mt-2">
            {/* ? form Wrapper */}
            <div
                className="w-[100%] flex-1"
                style={{
                    maxHeight: "calc(var(--modal-content-max-height) - 70px)",
                    overflow: "hidden",
                    overflowY: "auto",
                }}
            >
                <div className="flex items-center gap-[.6rem] pt-1">
                    <div className="min-w-max">
                        <div className="rounded-full outline-2 cs-outline w-[60px] h-[60px]">
                            <Image
                                className="rounded-full w-full h-full"
                                width={60}
                                height={60}
                                style={{ objectFit: "cover" }}
                                src={globalContext.user.avatar}
                                alt={
                                    "author " +
                                    globalContext.user.username +
                                    " avatar"
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="">
                            <p className="tracking-wide px-1 font-semibold">
                                {globalContext.user?.full_name ? (
                                    <span>{globalContext.user.full_name}</span>
                                ) : (
                                    <span>@{globalContext.user.username}</span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center pt-1 justify-between w-[100%] bg-color rounded-sm px-1">
                            <select
                                name=""
                                id=""
                                className="py-1 px-2 rounded-md text-sm tertiary-bg cursor-pointer"
                            >
                                <option value="">Public</option>
                                <option value="">Friends</option>
                                <option value="">Followers</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    ref={postFormWrapperRef}
                    className="px-1 flex flex-col gap-[1rem] my-[2rem]"
                >
                    <div>
                        <Input
                            type="text"
                            name="caption"
                            autoFocus
                            autoComplete="off"
                            spellCheck={false}
                            aria-label="Post Caption"
                            placeholder={`What's on your mind? ${
                                globalContext.user.first_name
                                    ? globalContext.user.first_name
                                    : globalContext.user.username
                            }`}
                            value={form.caption || ""}
                            onChange={handleFormChange}
                            className="tertiary-bg px-[.5rem]"
                        />
                    </div>

                    <div>
                        <Textarea
                            id="formTextArea"
                            onChange={handleFormChange}
                            name="excerpt"
                            value={form.excerpt || ""}
                            placeholder="Add a Description"
                            rows={3}
                            icon={false}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-primary text-white px-2 py-1 rounded-lg"
                            onClick={() => setAddHashTag((prev) => !prev)}
                        >
                            {!addHashtag ? (
                                "Add hashtag"
                            ) : (
                                <>
                                    {form.hashtags?.split(",").length > 1
                                        ? "Hashtags"
                                        : "Hashtag"}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="hashtags">
                        {addHashtag && (
                            <HashtagField
                                name="hashtags"
                                placeholder="Add hashtags! separated by comma"
                                value={form.hashtags || ""}
                                onChange={handleFormChange}
                            />
                        )}
                    </div>
                </div>
            </div>
            <span
                className="divider"
                style={{
                    backgroundColor: "grey",
                    padding: "0",
                    margin: "0",
                }}
            ></span>
            <div className="pt-3">
                <div className="flex items-center py-2">
                    <button
                        className=""
                        title="Image"
                        data-file="photo"
                        onClick={uploader}
                        data-accepts="image/jpeg"
                    >
                        <Icon name={"create"} />
                    </button>
                    <button
                        className="icon-wrapper cursor-pointer ml-2"
                        data-file="video"
                        onClick={uploader}
                        title="Video"
                    >
                        <Icon name={"video"} />
                    </button>
                    <button
                        className="icon-wrapper cursor-pointer ml-2"
                        title="Events"
                    >
                        <Icon name={"calender"} />
                    </button>
                    <button
                        className="icon-wrapper cursor-pointer ml-2"
                        title="Article"
                    >
                        <svg
                            className="_red-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z" />
                        </svg>
                    </button>
                    <button className="pl-1">Attach a file</button>
                </div>
            </div>
        </div>
    )
}

export default PostForm
