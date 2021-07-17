import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import Share from '@components/Share';

import { ShareMock, ShareNullMock } from '__mocks__/share';
import createAppRender from '__mocks__/createAppRender';

describe('Render share post', () => {
  afterEach(cleanup);

  it('Should render empty post', () => {
    createAppRender(<Share post={ShareNullMock} />);
    expect(screen.getByText('Esse post não existe mais.')).toBeInTheDocument();
  });

  it('Should not render empty post', () => {
    createAppRender(<Share post={ShareMock} />);
    expect(
      screen.queryByText('Esse post não existe mais.'),
    ).not.toBeInTheDocument();
  });
});
