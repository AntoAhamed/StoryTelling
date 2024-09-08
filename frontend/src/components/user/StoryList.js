import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

function StoryList() {
    const navigate = useNavigate()
    const [stories, setStories] = useState([{}])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleReadStory = (storyId) => {
        localStorage.setItem('storyId', storyId)
        navigate('/read')
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        if (!userInfo) {
            alert("Please login first.")
            navigate('/login')
            return
        }

        const fetchStories = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }

                const { data } = await axios.get('http://localhost:5000/api/userRoutes/getAllStories', config)
                setStories(data.stories)
            } catch (error) {
                console.error(error)
            }
        }

        fetchStories()
    }, [])

    return (
        <div className='container list'>
            <div className='row'>
                <div className='col-4 mx-4'>
                    <Profile userInfo={userInfo} />
                </div>
                <div className='col-7 border rounded p-4 bg-light'>
                    <h1 className='mb-4'><u>Stories to Read</u></h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Action to Take</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.length > 0 ? stories.map((story, storyIndex) => (
                                <tr key={storyIndex}>
                                    <th scope="row">{storyIndex + 1}</th>
                                    <td>{story.title}</td>
                                    <td>{story.author?.name}</td>
                                    <td><button className='btn btn-sm btn-primary m-2' onClick={() => handleReadStory(story._id)}>Read Story</button></td>
                                </tr>
                            )) : 'No Stories to Read'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StoryList
