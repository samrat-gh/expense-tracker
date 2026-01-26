"use client";

import { useCustomAuth } from "@/hooks/useCustomAuth";

const Page = () => {
  const { user } = useCustomAuth();

  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default Page;
