import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/items/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-blue-50 p-4 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">Listed Date : {new Date(task.listeddate).toLocaleDateString()}</p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => setEditingTask(task)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
