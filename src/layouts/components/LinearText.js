import React from "react";

function LinearText({ colors = ["red", "blue"], title, fontSize }) {
    return (
        <p style={{
            backgroundImage: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: fontSize
        }}>
            {title}
        </p>
    );
}

export default LinearText;