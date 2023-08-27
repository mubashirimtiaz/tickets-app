import { Suspense } from 'react';
import { Ticket } from './type';
import Link from 'next/link';
import Loading from '@/app/loading';

const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch('http://localhost:4000/tickets', {
    cache: 'no-cache',
  });
  return res.json();
};

const Tickets = async () => {
  const tickets = await getTickets();

  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href='/tickets/create' className='ml-auto'>
          <button className='btn-primary'>New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        {tickets?.map((ticket) => (
          <div key={ticket.id} className='card my-5'>
            <Link href={`/tickets/${ticket.id}`}>
              <h3 className='capitalize'>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>{ticket.priority}</div>
            </Link>
          </div>
        ))}
        {tickets?.length === 0 && (
          <p className='text-center'>No tickets found.</p>
        )}
      </Suspense>
    </main>
  );
};

export default Tickets;
