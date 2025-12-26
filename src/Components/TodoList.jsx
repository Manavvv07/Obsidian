import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, CheckSquare, Square } from 'lucide-react';
import { animate } from "animejs";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('obsidian_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('obsidian_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTasks([...tasks, newTask]);
    setInputValue('');

    setTimeout(() => {
        if (listRef.current?.lastChild) {
            animate(listRef.current.lastChild, {
                translateX: [-20, 0],
                opacity: [0, 1],
                duration: 400,
                ease: 'outQuad' 
            });
        }
    }, 10);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ADD OBJECTIVE..."
          className="todo-input"
        />
        <button type="submit" className="icon-btn">
          <Plus size={18} />
        </button>
      </form>

      <ul ref={listRef} className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
            <button onClick={() => toggleTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00f3ff' }}>
              {task.completed ? <CheckSquare size={16} /> : <Square size={16} />}
            </button>
            <span className="task-text">{task.text.toUpperCase()}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;