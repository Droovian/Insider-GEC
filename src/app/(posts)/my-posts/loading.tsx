import { SpinnerDiamond } from 'spinners-react';

export default function Loading(){
    return <div className='flex h-screen justify-center items-center'>
        <SpinnerDiamond color='#000000' size={100}/>
    </div>  
}