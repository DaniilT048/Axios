import './Card.css'
import {ReactElement, ReactNode} from "react";

type CardProps = {
    children: ReactNode;
}

export default function Card ({children}:CardProps): ReactElement {
    return <div className='card'>{children}</div>
}

