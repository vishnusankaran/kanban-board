import mongoose from 'mongoose';

const schema = new mongoose.Schema({
        name: { type: String, required: true },
        lists: [{ 
            name: { type: String, required: true },
            tasks: [{
                content: { type: String, required: true }
            }]
         }],
    }, { collection: 'boards' });

export default mongoose.model('board', schema);