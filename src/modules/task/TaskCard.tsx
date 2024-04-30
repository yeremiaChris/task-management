import { Card, CardBody, CardProps } from "@nextui-org/react";
import Status from "./Status";
import { memo } from "react";

export type StatusType = "Todo" | "Doing" | "Done" | "Delete";

export interface TaskCardProps extends CardProps {
  status?: StatusType;
  title: string;
  description: string;
}

const TaskCard = memo(
  ({ description, status, title, ...taskProps }: TaskCardProps) => {
    return (
      <Card {...taskProps}>
        <CardBody>
          <Status status={status} />
          <h2 className="mt-2 mb-1">{title}</h2>
          <p className="text-xs">{description}</p>
        </CardBody>
      </Card>
    );
  }
);

export default TaskCard;
