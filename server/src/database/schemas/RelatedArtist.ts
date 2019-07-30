import {Schema} from 'mongoose';

export default new Schema({
    _id: String,
    pathFromStaind: {
        type: [String],
        required: true
    }
});