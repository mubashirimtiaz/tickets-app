import Link from 'next/link';

const MainNotFound = () => {
  return (
    <main className='text-center'>
      <h2 className='text-3xl1'>Page Not Found</h2>
      <p>We could not find the page you are looking for</p>
      <p>
        Go back to the <Link href='/'>Home</Link>
      </p>
    </main>
  );
};

export default MainNotFound;
