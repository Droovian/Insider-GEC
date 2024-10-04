import { SpinnerCircular } from "spinners-react";

export default function Loading(){
    return (
        <div className='flex h-screen justify-center items-center'>
            <SpinnerCircular color='#5cb848' size={100}/>
        </div>
    );
}