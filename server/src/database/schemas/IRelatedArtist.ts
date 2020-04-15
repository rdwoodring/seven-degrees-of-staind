import {Document} from 'mongoose';

export default interface IRelatedArtist extends Document {
    _id: String,
    pathFromStaind: String[]
}