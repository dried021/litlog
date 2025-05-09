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
        fetch(`https://ee6f455d-9dd2-463d-9e5f-2752da892af8.mock.pstmn.io/members/bbb/books/favorite`)
        //fetch(`http://localhost:9090/members/${userId}/books/favorite`)
            .then(res => res.json())
            .then(data => setFavoriteBooks(data))
            .catch(error => console.error(error))
    }, [userId]);
    
    return (
        <GroupBooks groupLabel="FAVORITE BOOKS" group={favoriteBooks} msg="No favorite books added"/>
    );
}