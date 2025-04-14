import axios from "axios";
import {ReactElement, useEffect, useState} from "react";

export default function UserData(): ReactElement {
    const [userData, setUserData] = useState(null);
    const[userId, setUserId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(():void => {
        const axiosUser = async ():Promise<void> =>{
            setLoading(true);
            setError(null);
        try{
            const response= await axios.get(`https://jsonplaceholder.typicode.com/users/`);
            setUserData(response.data);
            console.log(response.data);
        }catch (err: unknown){
            if (err instanceof Error){
                setError(err.message);
                setUserData(null)
            }else{
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
                <div>

                </div>
            ): null}
        </>
    )
}

