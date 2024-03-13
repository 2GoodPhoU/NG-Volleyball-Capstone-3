import React from "react";


interface Props {
    children: string
    onClick: () => void;
    color: string;

}


const Button = ({children,onClick,color}: Props) => {
    
    return (
        <button className='btn btn-primary' onClick = {onclick} > {children}</button>
    )
}
export default Button;