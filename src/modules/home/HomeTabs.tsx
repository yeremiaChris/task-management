import { useCallback, useMemo, useState } from "react";
import TaskCard, { StatusType, TaskCardProps } from "../task/TaskCard";
import CreateTaskForm from "../task/CreateTaskForm";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Button } from "@nextui-org/react";
export interface UpdateStatus {
  index: number;
  status: StatusType;
}

const initialValue: TaskCardProps = {
  title: "[FE] Slicing task ui",
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          vel dolorem reiciendis repellendus consectetur quidem modi, ratione,
          mollitia magni fugiat autem iure vitae. Dolor laboriosam est natus
          eaque tempore ex.`,
  date: new Date().toLocaleDateString(),
};

const HomeTabs = () => {
  const [tasks, setTask] = useState<TaskCardProps[]>([initialValue]);

  const tasksValue = useMemo(() => tasks, [tasks]);

  const createTask = useCallback((payload: TaskCardProps) => {
    setTask((prevState) => {
      return [...prevState, payload];
    });
  }, []);
  const deleteTask = useCallback((idx: number) => {
    setTask((prevState) => {
      return prevState.filter((_, index) => index !== idx);
    });
  }, []);

  return (
    <>
      <div className="mt-4 grid gap-3">
        <CreateTaskForm
          handleCreateTask={createTask}
          buttonProps={{ title: "Create Task" }}
        />

        {!tasksValue.length ? (
          <p className="text-center">No task to display.</p>
        ) : null}

        {tasksValue.length ? (
          <div className="grid md:grid-cols-3 gap-3">
            {tasksValue.map((task, index) => (
              <TaskCard key={`${index}-task`} {...task}>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    onClick={() => deleteTask(index)}
                  >
                    <FiTrash2 />
                  </Button>
                  <Button isIconOnly size="sm" variant="bordered">
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
