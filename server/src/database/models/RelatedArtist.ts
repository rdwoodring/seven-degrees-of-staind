import {model} from 'mongoose';

import IRelatedArtist from '../schemas/IRelatedArtist';
import RelatedArtist from '../schemas/RelatedArtist';

export default model<IRelatedArtist>('RelatedArtist', RelatedArtist)