"use server";

import { getDictionary } from "@/dictionaries";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import bcrypt from "bcrypt";
import prisma from "@/db";

const createUserSchema = (dict: Awaited<ReturnType<typeof getDictionary>>) =>
  z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
      role: z.enum(["USER", "ADMIN"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: dict.errors.passwordsDontMatch,
      path: ["confirmPassword"],
    });

export async function createUser(prevState: any, formData: FormData) {
  const dict = await getDictionary();

  const session = await getServerSession(authOptions);

  if (!session?.user.role.includes("ADMIN")) {
    return {
      errorMessage: dict.errors.permissionDenied,
    };
  }

  const validatedFields = createUserSchema(dict).safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, role } = validatedFields.data;

  try {
    const hash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { email, password: hash, role },
    });
  } catch (error) {
    console.error(error);

    if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      return { errorMessage: dict.errors.emailAlreadyExists };
    }

    return { errorMessage: dict.errors.somethingWentWrong };
  }

  return revalidatePath("/users");
}

const updateUserSchema = (dict: Awaited<ReturnType<typeof getDictionary>>) =>
  z
    .object({
      email: z.string().email(),
      password: z.union([z.string().min(8), z.literal("")]).optional(),
      confirmPassword: z.union([z.string().min(8), z.literal("")]).optional(),
      role: z.enum(["USER", "ADMIN"]),
    })
    .refine(
      (data) => data.password === data.confirmPassword || !data.password,
      {
        message: dict.errors.passwordsDontMatch,
        path: ["confirmPassword"],
      }
    );

export async function updateUser(
  id: number,
  prevState: any,
  formData: FormData
) {
  const dict = await getDictionary();

  const session = await getServerSession(authOptions);

  if (!session?.user.role.includes("ADMIN")) {
    return {
      errorMessage: dict.errors.permissionDenied,
    };
  }

  const validatedFields = updateUserSchema(dict).safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, role } = validatedFields.data;

  try {
    const data: Prisma.UserUpdateInput = { email, role };

    if (password) {
      data.password = await bcrypt.hash(password, 12);
    }

    await prisma.user.update({ data, where: { id } });
  } catch (error) {
    console.error(error);

    if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      return { errorMessage: dict.errors.emailAlreadyExists };
    }

    return { errorMessage: dict.errors.somethingWentWrong };
  }

  return revalidatePath("/users");
}

export async function deleteUser(id: number) {
  const dict = await getDictionary();

  const session = await getServerSession(authOptions);

  if (!session?.user.role.includes("ADMIN")) {
    return {
      errorMessage: dict.errors.permissionDenied,
    };
  }

  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.error(error);

    return { errorMessage: dict.errors.somethingWentWrong };
  }

  return revalidatePath("/users");
}
