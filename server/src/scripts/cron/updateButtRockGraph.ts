import traverseButtRockGraph from './traverseButtRockGraph';
import importRelatedArtists from './importRelatedArtists';

traverseButtRockGraph().then(() => {
    return importRelatedArtists();
});