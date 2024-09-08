const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
    },
    nodes: [
        {
            choice: String,
            text: { type: String, required: true },
            choices: [
                {
                    text: { type: String, required: true },
                    nodeIndex: { type: Number, default: 0 },
                    choiceCount: { type: Number, default: 0 },
                }
            ],
            timeSpent: { type: Number, default: 0 },
        }
    ],
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
