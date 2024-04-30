import {
  Code,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownItemProps,
} from "@nextui-org/react";
import { StatusType } from "./TaskCard";
import { useState } from "react";

interface StatusProps {
  children?: React.ReactNode;
}
const Status = ({ children }: StatusProps) => {
  const getColorType = (status?: StatusType) => {
    switch (status) {
      case "Todo":
        return "danger";
      case "Doing":
        return "warning";
      default:
        return "success";
    }
  };

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

  return (
    <div className="flex justify-between items-center">
      <Dropdown>
        <DropdownTrigger>
          <Code as="button" color={getColorType(currentStatus)}>
            {currentStatus}
          </Code>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item) => (
            <DropdownItem
              key={item.key}
              {...item.dropdownProps}
              onClick={() => {
                setCurrentStatus(item.key);
              }}
            >
              {item.key}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {children}
    </div>
  );
};

export default Status;
