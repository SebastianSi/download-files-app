import { render } from '@testing-library/react';

import { DownloadFilesPage } from './DownloadFilesPage';

describe('Download Files page', () => {
  it('matches the snapshot', () => {
    const { baseElement } = render(<DownloadFilesPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
