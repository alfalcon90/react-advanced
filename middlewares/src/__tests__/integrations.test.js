import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [
      { name: 'comment 1' },
      { name: 'comment 2' },
      { name: 'comment 3' },
    ],
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  // Attemp to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>,
  );

  // Find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');

  moxios.wait(() => {
    // Expect to find a list of comments
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(3);
    done();
    wrapped.unmount();
  });
});
