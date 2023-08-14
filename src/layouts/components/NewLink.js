import React from "react";
import { Link } from "react-router-dom"
function NewLink({
    link,
    child,
    styles
}) {
    return (
        <Link to={link} style={styles}>
            {child}
        </Link>
    );
}

export default NewLink;