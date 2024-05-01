import { Card, CardBody, CardProps } from "@nextui-org/react";
import Status from "./Status";
import { ReactNode, memo } from "react";

export type StatusType = "Todo" | "Doing" | "Done" | "Delete";

export interface TaskCardProps extends CardProps {
  date?: string;
  children?: ReactNode;
  title: string;
  description: string;
}

const TaskCard = memo(
  ({ description, children, title, date, ...taskProps }: TaskCardProps) => {
    return (
      <Card {...taskProps}>
        <CardBody>
          <Status>{children}</Status>
          <h2 className="mt-2 mb-1">{title || "-"}</h2>
          <p className="text-xs">{description || "-"}</p>
          <p className="text-xs mt-2 text-gray-700">Due date: {date || "-"}</p>
        </CardBody>
      </Card>
    );
  }
);

export default TaskCard;
