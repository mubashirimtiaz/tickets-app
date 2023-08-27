'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TEvent = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const Create = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = <T extends TEvent>(event: React.ChangeEvent<T>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'body':
        setBody(value);
        break;
      case 'priority':
        setPriority(value);
        break;
      case 'title':
        setTitle(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const ticket = { title, body, priority, email: 'mario@netninja.dev' };

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      router.refresh();
      router.push('/tickets');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-1/2'>
      <label>
        <span>Title:</span>
        <input
          required
          type='text'
          name='title'
          value={title}
          onChange={handleChange<HTMLInputElement>}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          name='body'
          value={body}
          onChange={handleChange<HTMLTextAreaElement>}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name='priority'
          value={priority}
          onChange={handleChange<HTMLSelectElement>}
        >
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      <button className='btn-primary' disabled={isLoading}>
        {isLoading && <span>Loading...</span>}
        {!isLoading && <span>Create</span>}
      </button>
    </form>
  );
};

export default Create;
