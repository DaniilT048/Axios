import './Card.css'
import {ReactElement, ReactNode, useState} from "react";

type CardProps = {
    children: ReactNode;
    moreInfo:{
        city?: string;
        street?: string;
        email?: string;
    }
}

export default function Card ({children, moreInfo}:CardProps): ReactElement {
    const [showMoreInfo, setShowMoreInfo] = useState (false);

    return (<div className='card'>
        {children}
        <button onClick={() => setShowMoreInfo(prev => !prev)}>
            {showMoreInfo? 'Hide info' : 'More Info'}
        </button>
        {
            showMoreInfo && (
                <div className="moreInfo">
                    <p>City: {moreInfo.city}</p>
                    <p>Street{moreInfo.street}</p>
                    <p>Email{moreInfo.email}</p>
                </div>
            )
        }
    </div>)
}

