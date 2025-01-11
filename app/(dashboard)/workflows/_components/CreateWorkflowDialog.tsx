"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

function CreateWorkflowDialog(props: CreateWorkflowDialogProps) {
  const { triggerText } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
