// import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import { userFollowUser, userUnfollowUser } from "./controller/UserController";
test('User Controller follow', () => { 
  Promise.all([userFollowUser(1, 11)]).then((values) => {
    console.log(values[0]);
    expect(values[0].error).toBe(false);
    // Promise.all([userUnfollowUser("1", "11")]).then((values) => {
    //   console.log("unfollowing", values[0]);
    //   expect(values[0].error).toBe(false);
    // });
  });
});