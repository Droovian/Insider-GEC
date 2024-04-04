import { SpinnerDiamond } from 'spinners-react';

const loading = () => {
    return (
        <div className='flex h-screen justify-center items-center'>
            <SpinnerDiamond color='#000000' size={100}/>
        </div>
    )
}

export default loading;