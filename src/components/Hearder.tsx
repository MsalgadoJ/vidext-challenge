'use client';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function Header() {
  const session = useSession();
  console.log('session', session);

  function renderAuth() {
    if (session.status === 'loading') {
      return null;
    } else if (session.data?.user) {
      return 'Your are logged In';
    } else {
      return <Button onClick={() => signIn('google')}>Sign In!</Button>;
    }
  }
  return (
    <div className="flex justify-between">
      <div>logo de Vidext</div>
      <div>{renderAuth()}</div>
    </div>
  );
}
