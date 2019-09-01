import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import ArtistItemCard from './ArtistItemCard';
import IArtistItemCardProps from './IArtistItemCardProps';

import Photo from '@material-ui/icons/Photo';

configure({ adapter: new Adapter() });

const getDefaultData = (): IArtistItemCardProps => {
    return {
        external_urls: {
            spotify: 'http://www.fakeurl.com'
        },
        followers: {
            href: null,
            total: 23
        },
        genres: [
            'bad',
            'really bad'
        ],
        href: 'http://www.href.com',
        id: '1234',
        images: [],
        isbuttrock: true,
        name: 'Fake Artist',
        popularity: 0,
        type: 'cool',
        uri: '5678'
    };
};

describe('render', () => {
    let data: IArtistItemCardProps;

    beforeEach(() => {
        data = getDefaultData();
    });

    describe('when the images prop is an empty array', () => {
        beforeEach(() => {
            data = {
                ...data,
                images: []
            };
        });

        it('should render a Photo icon', () => {
            const wrapper = shallow(<ArtistItemCard {...data} />);

            expect(wrapper.dive().find(Photo).length).toBe(1);
        });
    });

    describe('when the images prop is not an empty array', () => {
        beforeEach(() => {
            data = {
                ...data,
                images: [
                    {
                        height: 100,
                        url: 'www.bananphone.com/ringringring.jpg',
                        width: 100
                    }
                ]
            };
        });

        it('should not render a Photo icon', () => {
            const wrapper = shallow(<ArtistItemCard {...data} />);

            expect(wrapper.dive().find(Photo).length).toBe(0);
        });
    });
});