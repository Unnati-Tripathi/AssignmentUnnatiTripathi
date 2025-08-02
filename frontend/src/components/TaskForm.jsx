import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [documents, setDocuments] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    
    for (let i = 0; i < documents.length; i++) {
      formData.append('documents', documents[i]);
    }

    dispatch(createTask(formData));
    
    setTitle('');
    setDocuments([]);
    e.target.reset();
  };

  return (
    <section className="p-4 mb-4 bg-gray-100 rounded-lg">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-700">New Task</label>
          <input
            type="text" name="title" id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="documents" className="mb-2 font-semibold text-gray-700">Attach Documents (PDF only, max 3)</label>
          <input
            type="file" name="documents" id="documents"
            multiple
            accept=".pdf"
            onChange={(e) => setDocuments(e.target.files)}
            className="p-2 bg-white border border-gray-300 rounded"
          />
        </div>
        
        <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;