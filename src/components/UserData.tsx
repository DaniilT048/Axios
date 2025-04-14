import axios from "axios";
import {ReactElement, useEffect, useState} from "react";
import Card from "./Card.tsx";
import { LuAccessibility } from "react-icons/lu";
import { WiAlien } from "react-icons/wi";
import { MdError } from "react-icons/md";

type User = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: {
        city: string;
        street: string;
    }
};

export default function UserData(): ReactElement {
    const [userData, setUserData] = useState<User[] | null>(null);
    const[count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleShowMoreUser = ():void =>{
        setCount (prev => ( prev >= 10 ? 1 : prev + 2));
    }

    useEffect((): void => {
            const axiosUser = async (): Promise<void> => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
                    setUserData(response.data);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        // @ts-ignore
                        setError(err.message);
                        setUserData(null);
                    } else {
                        // @ts-ignore
                        setError("Something went wrong");
                    }

                } finally {
                    setLoading(false);
                }
            }
            axiosUser();
        },
        []);

    return (
        <>
            {loading ? (
                <LuAccessibility style={{fontSize: 56}}/>
            ) : error ? (
                <MdError style={{fontSize: 56}}/>
            ): userData ? (<div className='usersCard'>{
                userData.slice(0, count).map(user => (
                    <Card key = {user.id} moreInfo={{
                        city: user.address.city,
                        street: user.address.street,
                        email: user.email
                    }}>
                        <WiAlien style={{fontSize: 80}}/>
                        <h3>{user.name}</h3>
                        <p>{user.phone}</p>
                    </Card>
                ))}
                </div>
            ): null}
            <button onClick={handleShowMoreUser}>Show +2 user's </button>
        </>
    )
}

