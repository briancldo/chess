import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import ActionButtons from '../../components/AppBar/ActionButtons';
import { test_login } from '../__utils__/login.test.utils';
import { getMockServer } from '../__utils__/ws/mockServer';
import { Server } from 'socket.io';

describe('#ChallengeButton', () => {
  let mockServer: Server;

  beforeAll(async () => {
    mockServer = await getMockServer();
  });

  afterAll(() => {
    mockServer.close();
  });

  test('displayed only when logged in', async () => {
    render(<ActionButtons />);

    expect(
      screen.queryByRole('button', { name: 'Challenge' })
    ).not.toBeInTheDocument();

    await test_login({ username: 'asd' });
    expect(
      screen.queryByRole('button', { name: 'Challenge' })
    ).toBeInTheDocument();
  });
});
