'use client';

import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session?.user?.name}!</p>
      <p>Email: {session?.user?.email}</p>
      {/* Display additional user information */}
    </div>
  );
};

export default Profile;