"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CloseOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import DialogContent from "@mui/material/DialogContent";
import DialogMUI, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

export const closeDialog = (router: AppRouterInstance) => {
  const url = new URL(location.href);

  url.searchParams.delete("dialog");
  url.searchParams.delete("id");

  router.push(url.toString());
};

const BootstrapDialog = styled(DialogMUI)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Dialog({ children, title, ...rest }: DialogProps) {
  const router = useRouter();

  const handleClose = () => {
    closeDialog(router);
  };

  return (
    <BootstrapDialog
      {...rest}
      aria-labelledby="dialog-title"
      onClose={handleClose}
    >
      <DialogTitle id="dialog-title" sx={{ m: 0, p: 2 }}>
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          color: (theme) => theme.palette.grey[500],
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <CloseOutlined />
      </IconButton>
      <DialogContent dividers sx={{ minWidth: 300 }}>
        {children}
      </DialogContent>
    </BootstrapDialog>
  );
}
