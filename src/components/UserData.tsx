import axios from "axios";
import {ReactElement, useEffect, useState} from "react";
import Card from "./Card.tsx";
import { LuAccessibility } from "react-icons/lu";

type User = {
    id: number;
    name: string;
    phone: string;
};

export default function UserData(): ReactElement {
    const [userData, setUserData] = useState<User[] | null>(null);
    const[count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleMoreUser = ():void =>{
        setCount (prev => ( prev >= 10 ? 1 : prev + 1));
    }

    useEffect(():void => {
        const axiosUser = async ():Promise<void> =>{
            setLoading(true);
            setError(null);
        try{
            const response= await axios.get(`https://jsonplaceholder.typicode.com/users/`);
            setUserData(response.data);
        }catch (err: unknown) {
            if (err instanceof Error) {
                // @ts-ignore
                setError(err.message);
                setUserData(null);
            } else {
                // @ts-ignore
                setError("Something went wrong");
            }

        }finally {
            setLoading(false);
        }
        }
        axiosUser();
    }, []);

    return (
        <>
            {loading ? (
                <LuAccessibility style={{fontSize: 56}} />
            ) : error ? (
                <p>{error}</p>
            ): userData ? (<div className='usersCard'>{
                userData.slice(0, count).map(user => (
                    <Card key = {user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.phone}</p>
                    </Card>
                ))}
                </div>
            ): null}
            <button onClick={handleMoreUser}>Show more User's</button>
        </>
    )
}

