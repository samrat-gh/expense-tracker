"use server";

import { getSession } from "../auth-server";
import { prisma } from "../prisma";

export const getCurrency = async () => {
  const session = await getSession();
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  const currency = user?.currency;
  return currency || "Rs";
};
