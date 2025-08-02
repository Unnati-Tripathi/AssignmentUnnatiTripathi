import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask({ ...editData, _id: task._id }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ 
        title: task.title, 
        description: task.description || '', 
        status: task.status,
        priority: task.priority,
    });
    setIsEditing(false);
  };
  
  if (!isEditing) {
    return (
      <div className="flex flex-col p-4 my-2 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex gap-4 mt-2">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{task.status}</span>
                <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{task.priority} Priority</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600">Edit</button>
            <button onClick={() => dispatch(deleteTask(task._id))} className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdate} className="p-4 my-2 bg-gray-50 rounded-lg shadow space-y-4">
      <input 
        type="text" 
        value={editData.title} 
        onChange={(e) => setEditData({...editData, title: e.target.value})}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea 
        value={editData.description} 
        onChange={(e) => setEditData({...editData, description: e.target.value})}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Description"
      />
      <div className="flex gap-4">
        <select value={editData.status} onChange={(e) => setEditData({...editData, status: e.target.value})} className="p-2 border border-gray-300 rounded">
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
        </select>
        <select value={editData.priority} onChange={(e) => setEditData({...editData, priority: e.target.value})} className="p-2 border border-gray-300 rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Save</button>
        <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
      </div>
    </form>
  );
}

export default TaskItem;