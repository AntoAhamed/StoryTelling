import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

function Insights() {
    const navigate = useNavigate()
    const [stories, setStories] = useState([])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

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

                const { data } = await axios.get('http://localhost:5000/api/userRoutes/getStories', config)
                setStories(data.stories)
            } catch (error) {
                console.error(error)
            }
        }

        fetchStories()
    }, [])

    return (
        <div className='container insights'>
            <div className='row'>
                <div className='col-4 mx-4'>
                    <Profile userInfo={userInfo} />
                </div>
                <div className='col-7 border rounded p-4 bg-light'>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        {stories.map((story, index) => (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <div>
                                            <h3>{story.title} <sub>-By {story.author.name}</sub></h3>
                                            <h5>{story.nodes[0].text.length < 15 ? story.nodes[0].text : story.nodes[0].text.slice(0, 16)}</h5>
                                        </div>
                                    </button>
                                </h2>
                                {story.nodes.map((node, index) => {
                                    let popularChoice = '', max = -1;
                                    for (let i = 0; i < node.choices.length; i++) {
                                        if (node.choices[i].choiceCount > max) {
                                            max = node.choices[i].choiceCount;
                                            popularChoice = node.choices[i].text;
                                        }
                                    }
                                    return (
                                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body d-flex flex-column">
                                                <p className='border-bottom'>Part {index + 1}</p>
                                                <span className='px-3'>Time Spent by the Users in part {index + 1}: {node.timeSpent}sec</span>
                                                <span className='px-3'>Popular Choice of this part: {popularChoice === '' ? 'No popular choice to show' : popularChoice}</span>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Insights
