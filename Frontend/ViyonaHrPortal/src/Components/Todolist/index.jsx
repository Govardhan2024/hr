import   { useState } from 'react';
import './index.css'; // Import the CSS file

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'New Employee Intro', date: 'June 2021', time: '3:00 PM', completed: false },
    { id: 2, title: 'Send Email to CEO', date: 'June 2021', time: '4:30 PM', completed: false },
    { id: 3, title: 'New Joining Employee Welcome Kit', employees: [
        'John Smith - Designer',
        'Hossein Shams - Developer',
        'Maryam Amiri - SEO',
        'Mike Litorus - iOS Developer'
      ], completed: false 
    },
    
  ]);

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="todo-container">
      
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <label>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
              />
              {task.title}
            </label>
            {task.date && <p><strong>Date:</strong> {task.date}</p>}
            {task.time && <p><strong>Time:</strong> {task.time}</p>}
            {task.employees && (
              <div>
                <strong>Employees:</strong>
                <ul className="employee-list">
                  {task.employees.map((employee, index) => (
                    <li key={index}>{employee}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
