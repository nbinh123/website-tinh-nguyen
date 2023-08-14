import React from "react";
function Button({ styles, title, onHoverEffect, onClicked }) {
    return (  
        <button onClick={onClicked} onMouseMove={onHoverEffect} style={styles}>
            {title}
        </button>
    );
}

export default Button;