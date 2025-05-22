import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupReviews from "./GroupReviews";

export default function PopularReviews() {
    const {userId} = useParams();
    const [reviews, setReviews] = useState(({
        "totalCount": 0,
        "reviews": []
    }));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/members/${userId}/reviews/popular`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews", error))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <p>Loading...</p>;

    return (
        <GroupReviews groupLabel="POPULAR REVIEWS" group={reviews} msg="No reviews to show"
            url={`/${userId}/reviews/timeline`}
        />
    );
}