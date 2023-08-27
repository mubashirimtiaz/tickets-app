import { Ticket } from '../type';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');
  const tickets: Ticket[] = await res.json();
  const paths = tickets.map((ticket) => ({
    id: ticket.id,
  }));
  return paths;
}

const getTicketDetails = async (id: string): Promise<Ticket> => {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }
  return res.json();
};

const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const ticket = await getTicketDetails(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>{ticket.priority}</div>
      </div>
    </main>
  );
};

export default TicketDetails;
