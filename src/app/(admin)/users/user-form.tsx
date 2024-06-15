"use client";

import { Box } from "@mui/material";
import { closeDialog } from "@/components/ui/dialog";
import { createUser, updateUser } from "./actions";
import { ErrorMessage, Select, TextField } from "@/components/ui";
import { getDictionary } from "@/dictionaries";
import { LoadingButton } from "@mui/lab";
import { Role, User } from "@prisma/client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export default function UserForm({
  dict,
  user,
}: Readonly<{
  dict: Awaited<ReturnType<typeof getDictionary>>;
  user?: User;
}>) {
  const [data, setData] = useState({
    email: user?.email ?? "",
    password: "",
    confirmPassword: "",
    role: user?.role ?? Role.USER,
  });

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const updateUserWithId = updateUser.bind(null, user?.id!);

  const formState = async (...args: [prevState: any, formData: FormData]) => {
    const state = await (user ? updateUserWithId : createUser)(...args);

    if (!state) {
      enqueueSnackbar(dict.form[`${user ? "update" : "create"}Success`], {
        variant: "success",
      });

      closeDialog(router);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(formState, null);

  const handleChange = (value: string, name: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box action={formAction} component="form">
      <ErrorMessage message={state?.errorMessage} sx={{ my: 1.5 }} />

      <TextField
        autoComplete="email"
        error={state?.errors?.email}
        label={dict.user.email}
        name="email"
        onChange={handleChange}
        required
        type="email"
        value={data.email}
      />

      <Select
        error={state?.errors?.role}
        label={dict.user.role}
        name="role"
        onChange={handleChange}
        options={Object.entries(Role).map(([label, value]) => ({
          label,
          value,
        }))}
        required
        value={data.role}
      />

      <TextField
        autoComplete="new-password"
        error={state?.errors?.password}
        inputProps={{ minLength: 8 }}
        label={dict.user.password}
        name="password"
        onChange={handleChange}
        required={!user}
        type="password"
        value={data.password}
      />

      <TextField
        autoComplete="new-password"
        error={state?.errors?.confirmPassword}
        inputProps={{ minLength: 8 }}
        label={dict.user.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        required={!user}
        type="password"
        value={data.confirmPassword}
      />

      <LoadingButton
        fullWidth
        loading={pending}
        size="large"
        sx={{ mt: 2.5 }}
        type="submit"
        variant="contained"
      >
        {dict.form.submit}
      </LoadingButton>
    </Box>
  );
}
