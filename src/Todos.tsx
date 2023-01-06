import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/Ri';
import { TodoType } from './App';

interface TodosProps {
  todos: TodoType[];
  handleToggle: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleDelete: (id: string) => void;
}

export const Todos: React.FC<TodosProps> = ({
  todos,
  handleToggle,
  setTodos,
  handleDelete,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={
            todo.complete
              ? 'flex justify-between border rounded-md p-4 my-2 border-[#1c2d25] bg-lime-700 capitalize'
              : 'flex justify-between border rounded-md p-4 my-2 border-[#1c2d25] capitalize'
          }
        >
          <div className='flex'>
            <input
              type='checkbox'
              id={todo.id}
              checked={todo.complete}
              onChange={() => handleToggle(todo.id)}
            />
            <label
              htmlFor={todo.id}
              className={
                todo.complete
                  ? 'ml-2 cursor-pointer line-through text-gray-700'
                  : 'ml-2 cursor-pointer'
              }
            >
              {todo.text}
            </label>
          </div>
          <button
            className='cursor-pointer flex items-center'
            onClick={() => handleDelete(todo.id)}
          >
            <RiDeleteBin5Line />
          </button>
        </li>
      ))}
    </ul>
  );
};
