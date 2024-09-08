const User = require('../models/User');
const Story = require('../models/Story');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({ message: 'Ok' });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addStory = async (req, res) => {
    const { title, nodes } = req.body;

    try {
        const story = {
            title: title,
            author: {
                id: req.user._id,
                name: req.user.name,
            },
            nodes: nodes,
        };
        await Story.create(story);
        res.json({ message: 'Story created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.json({ stories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.readStory = async (req, res) => {
    const { storyId } = req.body;

    try {
        const story = await Story.findById({ _id: storyId });
        res.json({ story });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.saveStory = async (req, res) => {
    const { story } = req.body;

    try {
        const findStoryToUpdate = await Story.findById({ _id: story._id });

        findStoryToUpdate.title = story.title;
        findStoryToUpdate.author = story.author;
        findStoryToUpdate.nodes = story.nodes;

        const updatedStory = await findStoryToUpdate.save();

        res.json({ message: 'Story updated successfully', updatedStory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find();
        let tmpStories = stories.filter((story) => {
            return story.author.id !== req.user._id;
        })
        res.json({ stories: tmpStories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}