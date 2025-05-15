import React from "react";
import styles from "./BookStack.module.css";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function BookStackBook({title, pageCount}) {
    const minWidth = 170;
    const maxWidth = 200;
    const minHeight = 15;
    const defaultHeight = 25;
    const heightIncrementUnit = 5;
    const minMargin = 5;
    const maxMargin = 20;
    const colors = ["#636B2F", "#BAC095", "#D4DE95", "#3D4127", "black"];
    const charLimit = 20;

    let width = getRandomInt(minWidth, maxWidth);
    let height = (pageCount && pageCount > 0) ? (Math.ceil(pageCount / 100)*heightIncrementUnit + minHeight) : defaultHeight;
    let color = getRandomInt(0, colors.length - 1);
    let margin = getRandomInt(minMargin, maxMargin);
    
    let titleSliced = (title.length > charLimit) ? `${title.slice(0, charLimit)}...` : title;

    return (
        <div className={styles.book}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                lineHeight: `${height}px`,
                backgroundColor: colors[color],
                color: (color === 1 || color === 2) ? "black" : "white",
                marginLeft: `${margin}px`
            }}
        >
            {titleSliced}
        </div>
    );
}