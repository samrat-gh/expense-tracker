"use client";

import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user, isLoaded: userLoaded } = useUser();

  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default Page;
