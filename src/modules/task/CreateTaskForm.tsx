import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  ModalProps,
  Textarea,
  ButtonProps,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskCardProps } from "./TaskCard";

type Inputs = {
  title: string;
  date: string;
  description: string;
};

interface CreateTaskForm extends Partial<ModalProps> {
  handleCreateTask: (payload: TaskCardProps) => void;
  buttonProps?: ButtonProps;
}

const CreateTaskForm = ({
  handleCreateTask,
  buttonProps,
  ...modalProps
}: CreateTaskForm) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    handleCreateTask(data);
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen} color="primary" {...buttonProps}>
        {buttonProps?.title}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        {...modalProps}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Task
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter your title"
                  variant="bordered"
                  {...register("title", { required: true })}
                  isRequired
                  aria-invalid={errors.title ? "true" : "false"}
                />
                <Input
                  label="Due date"
                  variant="bordered"
                  type="date"
                  {...register("date")}
                />
                <Textarea
                  {...register("description")}
                  label="Description"
                  placeholder="Enter your description"
                  type="description"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
