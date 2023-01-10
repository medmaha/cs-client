import React from "react"
import PremiumSuggestion from "./premuim"
import FollowingSuggestions from "./Follow"
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
