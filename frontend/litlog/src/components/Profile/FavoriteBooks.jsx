import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GroupBooks from "./GroupBooks";

export default function FavoriteBooks() {
    const {userId} = useParams();
    const [favoriteBooks, setFavoriteBooks] = useState(({
        "totalCount":0,
        "books":[]
    }));

    useEffect(()=>{
        fetch(`/api/members/${userId}/books/favorite`)
            .then(res => res.json())
            .then(data => setFavoriteBooks(data))
            .catch(error => console.error(error))
    }, [userId]);
    
    return (
        <GroupBooks groupLabel="FAVORITE BOOKS" group={favoriteBooks} msg="No books to show"
            url={`/${userId}/bookshelf`}
        />
    );
}