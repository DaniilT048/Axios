import axios from "axios";
import {ReactElement, useEffect, useState} from "react";
import Card from "./Card.tsx";

export default function UserData(): ReactElement {
    const [userData, setUserData] = useState(null);
    const[userId, setUserId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleMoreUser = ():void =>{
        setUserId(userId + 1);
    }

    useEffect(():void => {
        const axiosUser = async ():Promise<void> =>{
            setLoading(true);
            setError(null);
        try{
            const response= await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUserData(response.data);
            console.log(response.data);
        }catch (err: unknown){
            if (err instanceof Error){
                // @ts-ignore
                setError(err.message);
                setUserData(null)
            }else{
                // @ts-ignore
                setError('Something went wrong');
            }

        }finally {
            setLoading(false);
        }
        }
        axiosUser();
    }, [userId]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ): userData ? (
                <Card>
                    <h3>{userData.name}</h3>
                    <p>{userData.phone}</p>
                </Card>
            ): null}
            <button onClick={handleMoreUser}>Show more User's</button>
        </>
    )
}

