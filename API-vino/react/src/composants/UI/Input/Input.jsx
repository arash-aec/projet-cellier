import React from "react";
import './Input.css'
const Input = (props) => {
  
    let inputElement = null
    switch(props.inputtype) {
        case 'input' :
            inputElement = <input {...props} />
            break
        default:
            inputElement = <input {...props} />

    } 
  return (
    <div>
        {inputElement}
    </div>
  )
}
export default Input
