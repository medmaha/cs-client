import React from "react"
import PremiumSuggestion from "./premium"
import FollowingSuggestions from "./follow"
import TrendingSuggestions from "./trending"

export default function Suggestions() {
    return (
        <>
            <PremiumSuggestion />
            <FollowingSuggestions />
            <TrendingSuggestions />
        </>
    )
}
