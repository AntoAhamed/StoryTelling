import React from 'react'
import user from '../../assets/user.png'

function profile(props) {
    const { userInfo } = props

    return (
        <div className='border rounded d-flex flex-column align-items-center p-4 mb-3 bg-light'>
            <img src={user} alt='user' width={'30%'} className='mb-4' />
            <h2 className='mb-4 border-bottom'>{userInfo?.name}</h2>
            <h5 className='mb-4'>{userInfo?.email}</h5>
        </div>
    )
}

export default profile
