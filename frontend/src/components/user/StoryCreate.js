import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

function StoryCreate() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [nodes, setNodes] = useState([
        { choice: '', text: '', choices: [] },
    ])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleNodeChange = (index, value) => {
        const newNodes = [...nodes]
        newNodes[index].text = value
        setNodes(newNodes)
    }

    const handleChoiceChange = (nodeIndex, choiceIndex, value) => {
        const newNodes = [...nodes]
        newNodes[nodeIndex].choices[choiceIndex].text = value
        newNodes[newNodes[nodeIndex].choices[choiceIndex].nodeIndex].choice = value + ` (in part ${nodeIndex + 1})`
        setNodes(newNodes)
    };

    const addChoice = (nodeIndex) => {
        const newNodes = [...nodes]
        newNodes[nodeIndex].choices.push({ text: '', nodeIndex: newNodes.length })
        newNodes.push({ choice: '', text: '', choices: [] })
        setNodes(newNodes)
    };

    const handleSubmit = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            const { data } = await axios.post('http://localhost:5000/api/userRoutes/addStory', { title, nodes }, config)
            setTitle('')
            setNodes([{ choice: '', text: '', choices: [] },])
            alert(data.message)
        } catch (error) {
            alert("Something went wrong. Please try again later.")
            console.error('Error creating story: ', error)
        }
    };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        if (!userInfo) {
            alert("Please login first.")
            navigate('/login')
            return
        }
    }, [])

    return (
        <div className='container create'>
            <div className='row'>
                <div className='col-4 mx-4'>
                    <Profile userInfo={userInfo} />
                </div>
                <div className='col-6 border rounded p-4 bg-light'>
                    <h1 className='mb-4'><u>Create a New Story</u></h1>
                    <div className='my-2'>
                        <h3 className="form-label mb-2">Title</h3>
                        <input
                            type="text"
                            className="form-control mb-4"
                            placeholder='Enter Title Here'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    {nodes.map((node, nodeIndex) => (
                        <div key={nodeIndex} className='border rounded p-4 mb-4'>
                            <h5 className='form-label mb-2'>Part {nodeIndex + 1}</h5>
                            {node.choice ? <label className='form-label'>If user choose: {node.choice}</label> : ''}
                            <textarea
                                className="form-control mb-2"
                                placeholder='Enter Story Here'
                                rows='5'
                                value={node.text}
                                onChange={(e) => handleNodeChange(nodeIndex, e.target.value)}
                                required
                            />
                            {node.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex}>
                                    <label className='form-label mb-2'>Choice {choiceIndex + 1}</label>
                                    <input
                                        type="text"
                                        className='form-control mb-2'
                                        placeholder='Enter Choice Here'
                                        value={choice.text}
                                        onChange={(e) =>
                                            handleChoiceChange(nodeIndex, choiceIndex, e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            ))}
                            <button className='btn btn-primary' onClick={() => addChoice(nodeIndex)}>Add Choice</button>
                        </div>
                    ))}
                    <button className='btn btn-success my-2' onClick={handleSubmit}>Submit Story</button>
                </div>
            </div>
        </div>
    )
}

export default StoryCreate
