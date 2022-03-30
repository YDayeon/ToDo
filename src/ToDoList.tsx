import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError('');
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer');
//     }
//     console.log('submit');
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder='Write a to do' />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  First_Name: string;
  Last_Name?: string;
  Username: string;
  Password1: string;
  Password2: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: any) => {
    if (data.Password1 !== data.Password2) {
      setError(
        'Password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    setError('extraError', { message: 'Server Offline' });
  };
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Email'
        />
        <span>{errors?.Username?.message}</span>
        <input
          {...register('First_Name', {
            required: 'write here',
            validate: (value) =>
              !value.includes('jo') ? 'no jo allowed' : true,
          })}
          placeholder='First_Name'
        />
        <span>{errors?.First_Name?.message}</span>
        <input
          {...register('Last_Name', { required: true })}
          placeholder='Last_name'
        />
        <span>{errors?.Last_Name?.message}</span>
        <input
          {...register('Username', { required: true, minLength: 10 })}
          placeholder='Username'
        />
        <input
          {...register('Password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short',
            },
          })}
          placeholder='Password'
        />
        <span>{errors?.Password1?.message}</span>
        <input
          {...register('Password2', {
            required: 'Password is required',
          })}
          placeholder='Password'
        />
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
