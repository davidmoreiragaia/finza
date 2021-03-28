import React from 'react';

//{project} is from the python file named project
const ImageHelper = ({project}) => {

    // project.image is from the python file name project/models and the database field "image"
    //The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. This operator is frequently used as a shortcut for the if statement.
    const imageurl = project ? project.image : `https://www.eccedu.net/userfiles/lector/lct-338-5.jpg`

    return(
        <div className="rounded border border-success p-2">
            <img src={imageurl}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded mx-auto d-block"
            alt=""/>
        </div>
    )
}

export default ImageHelper;



// export default function ImageHelper() {
//     return(
//         <div>

//         </div>
//     )
// }