import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import CAImage from '@components/CAImage';
import createAppRender from '__mocks__/createAppRender';

describe('<CAImage />', () => {
  it('Should render an image', async () => {
    await preloadAll();

    createAppRender(
      <CAImage src="/CardSEO.png" width="200px" height="300px" alt="Gato" />,
    );

    expect(screen.getByAltText('Gato')).toBeInTheDocument();
  });

  it('Should not show image in full screen on first render', () => {
    expect(screen.queryByTestId('full-screen-image')).not.toBeInTheDocument();
  });

  it('Should render image in full screen when clicked', async () => {
    const button = screen.getByTestId('ca-image-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByTestId('full-screen-image')).toBeInTheDocument();
    });
  });

  it('Should remove full screen image when clicked', () => {
    const button = screen.getByTestId('close-full-screen-image');
    fireEvent.click(button);

    expect(screen.queryByTestId('full-screen-image')).not.toBeInTheDocument();
  });
});
