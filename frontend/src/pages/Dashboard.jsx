import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { getTasks, reset } from '../features/tasks/taskSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  const [filters, setFilters] = useState({
    status: '', 
    priority: '', 
    sortBy: 'createdAt:desc', 
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) { console.log(message); }
    if (!user) { navigate('/login'); return; }

    dispatch(getTasks(filters));

    return () => { dispatch(reset()); };
  }, [user, navigate, isError, message, dispatch, filters]); 

  if (isLoading) { return <h2>Loading tasks...</h2>; }

  return (
    <div>
      <section className="my-4">
        <h1 className="text-2xl font-bold">Welcome {user && user.email}</h1>
        <p className="text-gray-500">Tasks Dashboard</p>
      </section>

      <TaskForm />

      <div className="flex justify-between items-center my-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" value={filters.status} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
              <option value="">All</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select name="priority" id="priority" value={filters.priority} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">Sort By</label>
          <select name="sortBy" id="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="dueDate:asc">Due Date</option>
          </select>
        </div>
      </div>

      <section className="mt-6">
        {tasks.length > 0 ? (
          <div className="tasks">
            {tasks.map((task) => ( <TaskItem key={task._id} task={task} /> ))}
          </div>
        ) : (
          <h3 className="text-center text-gray-500">No tasks found with these filters</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;