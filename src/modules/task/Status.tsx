import {
  Code,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownItemProps,
} from "@nextui-org/react";
import { StatusType } from "./TaskCard";
interface StatusProps {
  status?: StatusType;
}

const Status = ({ status }: StatusProps) => {
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
    {
      key: "Delete",
      dropdownProps: {
        className: "text-danger",
        color: "danger",
      },
    },
  ];

  return (
    <div className="flex">
      <Dropdown>
        <DropdownTrigger>
          <Code as="button" color={getColorType(status)}>
            {status}
          </Code>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item) => (
            <DropdownItem key={item.key} {...item.dropdownProps}>
              {item.key}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Status;
