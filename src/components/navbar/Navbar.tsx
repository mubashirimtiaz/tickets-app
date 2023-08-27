'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    { path: '/', title: 'Dashboard' },
    { path: '/tickets', title: 'Tickets' },
  ];
  return (
    <nav>
      <Image
        src='/logo.png'
        alt='dojo-logo'
        width={70}
        height={70}
        quality={100}
      />
      <h1>DOJO HELPDESK</h1>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              className={`${pathname === route.path && `active`}`}
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
