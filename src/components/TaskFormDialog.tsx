/**
 * Components
 */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "@/components/forms/TaskForm";

/**
 * Types
 */
import type { PropsWithChildren } from "react";

const TaskFormDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="p-0 border-0 rounded-xl">
          <TaskForm />
        </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;