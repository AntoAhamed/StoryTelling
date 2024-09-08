import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

function StoryRead() {
    const navigate = useNavigate()
    const [story, setStory] = useState({})
    const [currentNode, setCurrentNode] = useState({
        currentNodeIndex: null, currentNode: {}
    })
    const [time, setTime] = useState(0)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleChoice = async (nextNodeIndex, choiceIndex) => {
        const nextNode = story.nodes[nextNodeIndex]
        story.nodes[currentNode.currentNodeIndex].choices[choiceIndex].choiceCount++
        story.nodes[currentNode.currentNodeIndex].timeSpent += time

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            const { data } = await axios.post('http://localhost:5000/api/userRoutes/saveStory', { story }, config)

            setStory(data.updatedStory)
        } catch (error) {
            console.error('Error creating story: ', error)
        }

        setTime(0)

        setCurrentNode({
            currentNodeIndex: nextNodeIndex,
            currentNode: nextNode
        })
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        if (!userInfo) {
            navigate('/login')
            return
        }

        const storyId = localStorage.getItem('storyId')

        const fetchStory = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }

                const { data } = await axios.post('http://localhost:5000/api/userRoutes/readStory', { storyId }, config)
                setStory(data.story)
                setCurrentNode({
                    currentNodeIndex: 0,
                    currentNode: data.story.nodes[0]
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchStory()

        const timer = setInterval(() => {
            setTime(prevCount => prevCount + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className='container read'>
            <div className='row'>
                <div className='col-4 mx-4'>
                    <Profile userInfo={userInfo} />
                </div>
                <div className='col-7 border rounded p-4 bg-light'>
                    <div className="card">
                        <div className="card-header p-4 d-flex justify-content-between">
                            <div>
                                <span>{story.title}</span> <sub className='mx-2'>-By {story.author?.name}</sub>
                            </div>
                            <div>{time}</div>
                        </div>
                        {currentNode && (
                            <div className='card-body'>
                                <p className='card-text text-center'><u>{currentNode.currentNode?.choice ? 'You Choose: ' + currentNode.currentNode?.choice : currentNode.currentNode?.choice}</u></p>
                                <p className='card-text m-4 p-4'>{currentNode.currentNode?.text}</p>
                                <div className='d-flex flex-row justify-content-center card-footer'>
                                    {currentNode.currentNode?.choices?.length > 0 ? currentNode.currentNode?.choices?.map((choice, index) => (
                                        <button key={index} className='btn btn-sm btn-secondary m-2' onClick={() => handleChoice(choice.nodeIndex, index)}>
                                            {choice.text}
                                        </button>
                                    )) : <div className='m-2'>The End</div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryRead
