const comments = {
    text: "some_text_1",
    replies: [
        {
            text: "some_text_2",
            replies: [
                {
                    text: "some_text_3",
                    replies: [
                        {
                            text: "some_text_4",
                            replies: [
                                {
                                    text: "some_text_5",
                                    replies: [
                                        {
                                            text: "some_text_6",
                                            replies: [
                                                {
                                                    text: "some_text_7",
                                                    replies: [
                                                        {
                                                            text: "some_text_8",
                                                            replies: [
                                                                {
                                                                    text: "some_text_9",
                                                                    replies: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "some_text_10",
                            replies: [
                                {
                                    text: "some_text_11",
                                    replies: [
                                        {
                                            text: "some_text_12",
                                            replies: [
                                                {
                                                    text: "some_text_13",
                                                    replies: [
                                                        {
                                                            text: "some_text_14",
                                                            replies: [
                                                                {
                                                                    text: "some_text_15",
                                                                    replies: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            text: "some_text_16",
                                            replies: [
                                                {
                                                    text: "some_text_17",
                                                    replies: [
                                                        {
                                                            text: "some_text_18",
                                                            replies: [],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

function logText(comments) {
    console.log(comments.text)

    if (comments.replies.length === 0) {
        return
    }

    for (const key in comments) {
        if (key === "text") continue
        const commentReplies = comments[key]

        for (let idx of Array(commentReplies.length).keys()) {
            const comment = commentReplies[idx]
            logText(comment)
        }
    }
    // for (let i = 0; i < comments.replies.length; i++) {
    // logText(comments.replies[i])
    // }
}

const renderComments = (comments) => {
    let commentList = []
    for (let key in comments) {
        commentList.push({
            comment: comments[key],
            children:
                comments[key].replies &&
                comments[key].replies.length > 0 &&
                renderComments(comments[key].replies),
        })
    }
    return commentList
}
console.log(renderComments(comments))
