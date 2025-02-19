import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function SetupUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  // const balance = await prisma.userBalance.findUnique({
  //   where: {
  //     userId,
  //   },
  // });
  // if (!balance) {
  //   await prisma.userBalance.create({
  //     data: {
  //       userId,
  //       credits: 100,
  //     },
  //   });
  // }

  // Use upsert instead of separate find and create
  await prisma.userBalance.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      credits: 100,
    },
    update: {}, // If record exists, don't update anything
  });

  redirect("/");
}
