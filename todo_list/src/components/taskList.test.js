import { render, fireEvent } from '@testing-library/react';
import TaskList from './taskList';

describe('TaskList Component', () => {
  const mockTasks = [
    {
      id: 1,
      assigned_to: 'John Doe',
      status: 'In Progress',
      due_date: '2024-09-30',
      priority: 'High',
      comment: 'This is a test task',
    },
  ];

  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  it('renders task list correctly', () => {
    const { getByText } = render(<TaskList tasks={mockTasks} onEdit={mockEdit} onDelete={mockDelete} />);

    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/In Progress/i)).toBeInTheDocument();
    expect(getByText(/2024-09-30/i)).toBeInTheDocument();
    expect(getByText(/High/i)).toBeInTheDocument();
    expect(getByText(/This is a test task/i)).toBeInTheDocument();
  });

  it('calls onEdit when the Edit button is clicked', () => {
    const { getByText } = render(<TaskList tasks={mockTasks} onEdit={mockEdit} onDelete={mockDelete} />);

    fireEvent.click(getByText(/Edit/i));
    expect(mockEdit).toHaveBeenCalledWith(mockTasks[0].id);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    const { getByText } = render(<TaskList tasks={mockTasks} onEdit={mockEdit} onDelete={mockDelete} />);

    fireEvent.click(getByText(/Delete/i));
    expect(mockDelete).toHaveBeenCalledWith(mockTasks[0].id);
  });
});
