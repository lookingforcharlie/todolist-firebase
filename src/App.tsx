import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/Ai';
import { db } from './firebase';
import { Todos } from './Todos';

export interface TodoType {
  id: string;
  text: string;
  complete: boolean;
}

function App() {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Retrieve todos from firebase and render on the page by using useEffect
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    // Taking a picture of the database in firebase, then reading it to us, so we can render out on the screen
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr: TodoType[] = [];
      QuerySnapshot.forEach((doc) => {
        // doc.data() returns the single document input in firestore
        const { text, complete } = doc.data();
        const id = doc.id;
        const singleTodo: TodoType = { id, text, complete };
        todosArr.push(singleTodo);
        // todosArr.push({...doc.data(), id:doc.id}) doesn't work under typeScript
      });
      setTodos(todosArr);
      // Question: what is the difference between "unsubscribe()"" and "() => unsubscribe()"
      return () => unsubscribe();
    });
  }, []);

  // adding new todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() !== '') {
      // if there's no collection called 'todos' in firestore, it will create one for me
      await addDoc(collection(db, 'todos'), {
        text,
        complete: false,
      });
    }
    setText('');
  };

  // Update todo in firebase
  const handleToggle = async (id: string) => {
    const tempTodos = [...todos];
    const todo = tempTodos.find((todo) => todo.id === id);
    // 'todos' is the collection name in firebase, id is the same as document id in firebase
    await updateDoc(doc(db, 'todos', id), {
      complete: !todo?.complete,
    });
  };

  // Delete todo
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className='p-4'>
      <div className='bg-transparent border-2 border-emerald-900 shadow-xl max-w-2xl w-full m-auto rounded-md p-4 mt-8'>
        <h1 className='font-bold text-3xl text-center text-[#1c2d25;] mb-5'>
          To-do App
        </h1>
        <form onSubmit={handleSubmit} className='flex justify-between mb-5'>
          <input
            className='border rounded-md p-2 w-full mr-3 text-xl'
            type='text'
            placeholder='Add Todo'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type='submit'
            className='border p-2 bg-lime-900 text-slate-100'
          >
            <AiOutlinePlus size={40} />
          </button>
        </form>
        <Todos
          todos={todos}
          handleToggle={handleToggle}
          setTodos={setTodos}
          handleDelete={handleDelete}
        />
        {todos.length > 0 && (
          <p className='text-center p-2'>
            You have {todos.filter((todo) => todo.complete != true).length}{' '}
            todos
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
