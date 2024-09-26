import { render, fireEvent } from '@testing-library/react';
import TaskForm from './taskForm';  

describe('TaskForm Component', () => {
  const mockSave = jest.fn();
  const mockCancel = jest.fn();
  const mockCurrentTask = {
    id: 1,
    assigned_to: 'John Doe',
    status: 'In Progress',
    due_date: '2024-09-30',
    priority: 'High',
    comment: 'This is a test task',
  };

  it('renders task form correctly', () => {
    const { getByLabelText } = render(<TaskForm onSave={mockSave} onCancel={mockCancel} currentTask={null} />);

    expect(getByLabelText(/Assigned To/i)).toBeInTheDocument();
    expect(getByLabelText(/Status/i)).toBeInTheDocument();
    expect(getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(getByLabelText(/Comment/i)).toBeInTheDocument();
  });

  it('fills the form with current task data when editing', () => {
    const { getByLabelText } = render(<TaskForm onSave={mockSave} onCancel={mockCancel} currentTask={mockCurrentTask} />);

    expect(getByLabelText(/Assigned To/i).value).toBe(mockCurrentTask.assigned_to);
    expect(getByLabelText(/Status/i).value).toBe(mockCurrentTask.status);
    expect(getByLabelText(/Due Date/i).value).toBe(mockCurrentTask.due_date);
    expect(getByLabelText(/Priority/i).value).toBe(mockCurrentTask.priority);
    expect(getByLabelText(/Comment/i).value).toBe(mockCurrentTask.comment);
  });

  it('calls onSave when the form is submitted', () => {
    const { getByText, getByLabelText } = render(<TaskForm onSave={mockSave} onCancel={mockCancel} currentTask={null} />);
    
    fireEvent.change(getByLabelText(/Assigned To/i), { target: { value: 'New User' } });
    fireEvent.change(getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.click(getByText(/Add Task/i));

    expect(mockSave).toHaveBeenCalledWith({
      id: '',
      assigned_to: 'New User',
      status: 'Pending',
      due_date: '',
      priority: '',
      comment: '',
    });
  });

  it('calls onCancel when the Cancel button is clicked', () => {
    const { getByText } = render(<TaskForm onSave={mockSave} onCancel={mockCancel} currentTask={null} />);

    fireEvent.click(getByText(/Cancel/i));
    expect(mockCancel).toHaveBeenCalled();
  });
});
