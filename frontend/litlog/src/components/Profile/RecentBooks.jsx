import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GroupBooks from "./GroupBooks";

export default function RecentBooks() {
    const {userId} = useParams();
    const [recentBooks, setRecentBooks] = useState(({
        "totalCount":0,
        "books":[]
    }));

    useEffect(()=>{
        fetch(`http://localhost:9090/members/${userId}/books/recent`)
            .then(res => res.json())
            .then(data => setRecentBooks(data))
            .catch(error => console.error(error))
    }, [userId]);
    
    return (
        <GroupBooks groupLabel="RECENT BOOKS" group={recentBooks} msg="No books to show"
            url={`/${userId}/bookshelf`}
        />
    );
}