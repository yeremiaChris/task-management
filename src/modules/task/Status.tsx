import { DropdownItemProps, Select, SelectItem } from "@nextui-org/react";
import { StatusType } from "./TaskCard";
import { useState } from "react";

interface StatusProps {
  children?: React.ReactNode;
}
const Status = ({ children }: StatusProps) => {
  const items: { key: StatusType; dropdownProps: DropdownItemProps }[] = [
    {
      key: "Todo",
      dropdownProps: {
        className: "text-danger",
        color: "danger",
      },
    },
    {
      key: "Doing",
      dropdownProps: {
        className: "text-warning",
        color: "warning",
      },
    },
    {
      key: "Done",
      dropdownProps: {
        className: "text-success",
        color: "success",
      },
    },
  ];

  const [currentStatus, setCurrentStatus] = useState<StatusType>("Todo");
  const isTodo = currentStatus === "Todo";
  const isDoing = currentStatus === "Doing";
  const getColor = isTodo ? "danger" : isDoing ? "warning" : "success";
  return (
    <div className="flex justify-between items-center">
      <Select
        color={getColor}
        placeholder="Select status"
        defaultSelectedKeys={["Todo"]}
        size="sm"
        className="w-24"
        value={currentStatus}
        onChange={(value) => setCurrentStatus(value.target.value as StatusType)}
      >
        {items.map((item) => (
          <SelectItem key={item.key} value={item.key}>
            {item.key}
          </SelectItem>
        ))}
      </Select>
      {children}
    </div>
  );
};

export default Status;
