import { useCallback, useState } from "react";
import TaskCard, { TaskCardProps } from "../task/TaskCard";
import CreateTaskForm from "../task/CreateTaskForm";
const HomeTabs = () => {
  const [tasks, setTask] = useState<TaskCardProps[]>([
    {
      title: "[FE] Slicing task ui",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          vel dolorem reiciendis repellendus consectetur quidem modi, ratione,
          mollitia magni fugiat autem iure vitae. Dolor laboriosam est natus
          eaque tempore ex.`,
      status: "Doing",
    },
  ]);

  const createTask = useCallback(() => {
    setTask((prevState) => {
      return [
        ...prevState,
        {
          title: "[FE] Slicing task ui",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          vel dolorem reiciendis repellendus consectetur quidem modi, ratione,
          mollitia magni fugiat autem iure vitae. Dolor laboriosam est natus
          eaque tempore ex.`,
          status: "Doing",
        },
      ];
    });
  }, []);
  console.log("halo");

  return (
    <>
      <div className="mt-4 grid gap-3">
        <CreateTaskForm onSubmit={() => createTask()} />

        {!tasks.length ? (
          <p className="text-center">No task to display.</p>
        ) : null}

        {tasks.length ? (
          <div className="grid md:grid-cols-3 gap-3">
            {tasks.map((task, index) => (
              <TaskCard key={`${index}-task`} {...task} />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomeTabs;
