import { render, screen } from '@testing-library/react';
import { DownloadFilesTable } from './DownloadFilesTable';

import * as api from '../mockApi/api';

const mockFilesData = [  
  { name: 'TestName1', device: 'TestDevice1', path: 'TestPath1', status: 'TestStatus1' },
  { name: 'TestName2', device: 'TestDevice2', path: 'TestPath2', status: 'TestStatus2' },
];

describe('Download Files Table', () => {
  beforeEach(() => {
    jest.spyOn(api, "getFiles").mockReturnValue(mockFilesData);
  });
  it('should display files data', async () => {
    render(<DownloadFilesTable />);
    expect(await screen.findByText('TestName1')).toBeInTheDocument();
    expect(await screen.findByText('TestDevice1')).toBeInTheDocument();
    expect(await screen.findByText('TestPath2')).toBeInTheDocument();
    expect(await screen.findByText('TestStatus2')).toBeInTheDocument();
  });
})