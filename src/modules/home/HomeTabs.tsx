import { useState } from "react";
import TaskCard, { StatusType, TaskCardProps } from "../task/TaskCard";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateTaskForm, { CreateTaskFormField } from "../task/CreateTaskForm";
import { toast } from "react-toastify";
export interface UpdateStatus {
  index: number;
  status: StatusType;
}

const HomeTabs = () => {
  const [tasks, setTask] = useState<TaskCardProps[]>([]);

  const [detailTask, setDetailTask] = useState<CreateTaskFormField | null>(
    null
  );

  const createTask = (payload: TaskCardProps, index?: string) => {
    setTask((prevState) => {
      return index
        ? prevState.map((item, idx) =>
            parseInt(index) === idx ? payload : item
          )
        : [...prevState, payload];
    });

    toast.success(`Success ${index ? "update" : "create"} task`);
  };

  const disclosure = useDisclosure();

  return (
    <>
      <div className="mt-4 grid gap-3">
        <CreateTaskForm
          handleCreateTask={createTask}
          disclosureProps={disclosure}
          defaultForm={detailTask}
          resetDetail={() => setDetailTask(null)}
        />

        {!tasks.length ? (
          <p className="text-center my-5">No task to display.</p>
        ) : null}

        {tasks.length ? (
          <div className="grid md:grid-cols-3 gap-3">
            {tasks.map((task, index) => (
              <TaskCard key={`${index}-task`} {...task}>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    onClick={() => {
                      setTask((prevState) => {
                        return prevState.filter((_, idx) => index !== idx);
                      });
                      toast.success(`Success delete task`);
                    }}
                  >
                    <FiTrash2 />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    onClick={() => {
                      setDetailTask({
                        title: task.title,
                        date: task.date as string,
                        description: task.description,
                        index: index.toString(),
                      });
                      disclosure.onOpen();
                    }}
                  >
                    <FiEdit />
                  </Button>
                </div>
              </TaskCard>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomeTabs;
