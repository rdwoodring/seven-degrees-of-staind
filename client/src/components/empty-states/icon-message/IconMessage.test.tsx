import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import IconMessage from './IconMessage';
import IIconMessageProps from './IIconMessageProps';

configure({ adapter: new Adapter() });

class FakeIcon extends React.PureComponent{
    render() {
        return (
            <div></div>
        );
    }
}

const getDefaultData = (): IIconMessageProps => {
    return {
        message: 'bitching cool message',
        icon: FakeIcon
    }
};

describe('render', () => {
    let data: IIconMessageProps;

    beforeEach(() => {
        data = getDefaultData();
    });

    it('should render the passed in Icon component', () => {
        const wrapper = shallow(<IconMessage {...data} />);

        expect(wrapper.find(FakeIcon).length).toBe(1);
    });

    it('should render the passed in message', () => {
        const wrapper = shallow(<IconMessage {...data} />);

        expect(wrapper.html()).toContain('bitching cool message');
    });
});
