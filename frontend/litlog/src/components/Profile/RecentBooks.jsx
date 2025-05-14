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
        //fetch(`https://ee6f455d-9dd2-463d-9e5f-2752da892af8.mock.pstmn.io/members/bbb/books/recent`)
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