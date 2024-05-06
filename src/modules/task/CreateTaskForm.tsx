import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  ButtonProps,
  ModalProps,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TaskCardProps } from "./TaskCard";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";

export type CreateTaskFormField = {
  title: string;
  date: string;
  index?: string;
  description: string;
};

interface CreateTaskForm extends Partial<ModalProps> {
  buttonProps?: ButtonProps;
  handleCreateTask: (props: TaskCardProps, index?: string) => void;
}

export type CreateTaskFormRef = {
  setDetail: (payload: CreateTaskFormField) => void;
};
const CreateTaskForm = forwardRef(
  (
    { buttonProps, handleCreateTask, ...modalProps }: CreateTaskForm,
    ref: Ref<CreateTaskFormRef>
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [detailTask, setDetailTask] = useState<CreateTaskFormField | null>(
      null
    );

    const { handleSubmit, control, setValue, reset } =
      useForm<CreateTaskFormField>();

    const handleClose = () => {
      setDetailTask(null);
      reset();
      onClose();
    };

    const onSubmit: SubmitHandler<CreateTaskFormField> = (
      data: CreateTaskFormField
    ) => {
      handleCreateTask(
        {
          date: data.date,
          description: data.description,
          title: data.title,
        },
        detailTask?.index
      );
      onClose();
    };

    const handleOpen = () => {
      onOpen();
      setDetailTask(null);
      reset();
    };

    useImperativeHandle(ref, () => ({
      setDetail: (payload: CreateTaskFormField) => {
        onOpen();
        setDetailTask(payload);
        setValue("date", payload.date ?? "");
        setValue("title", payload.title);
        setValue("description", payload.description);
      },
    }));

    return (
      <>
        <Button
          onPress={handleOpen}
          color="primary"
          {...buttonProps}
          className="font-bold"
        >
          Create Task
        </Button>
        <Modal
          isOpen={isOpen}
          placement="auto"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          hideCloseButton
          {...modalProps}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {detailTask ? "Update" : "Create"} Task
            </ModalHeader>
            <ModalBody>
              <Controller
                control={control}
                name="title"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    label="Title"
                    placeholder="Enter your title"
                    id="title"
                    variant="bordered"
                    isRequired
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="date"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    label="Due date"
                    variant="bordered"
                    id="date"
                    type="date"
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    id="description"
                    label="Description"
                    placeholder="Enter your description"
                    variant="bordered"
                    {...field}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" type="button" onClick={handleClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                {detailTask ? "Update" : "Submit"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default CreateTaskForm;
