import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  ButtonProps,
  UseDisclosureProps,
  ModalProps,
  Textarea,
} from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TaskCardProps } from "./TaskCard";
import { useEffect } from "react";

export type CreateTaskFormField = {
  title: string;
  date: string;
  index?: string;
  description: string;
};

interface CreateTaskForm extends Partial<ModalProps> {
  buttonProps?: ButtonProps;
  disclosureProps: UseDisclosureProps & { onOpenChange?: () => void };
  defaultForm?: CreateTaskFormField | null;
  resetDetail: () => void;
  handleCreateTask: (props: TaskCardProps, index?: string) => void;
}

const CreateTaskForm = ({
  defaultForm,
  buttonProps,
  disclosureProps,
  resetDetail,
  handleCreateTask,
  ...modalProps
}: CreateTaskForm) => {
  const { isOpen, onOpen, onClose } = disclosureProps;

  const { handleSubmit, control, reset, setValue } =
    useForm<CreateTaskFormField>();

  const onSubmit: SubmitHandler<CreateTaskFormField> = (
    data: CreateTaskFormField
  ) => {
    handleCreateTask(
      {
        date: data.date,
        description: data.description,
        title: data.title,
      },
      defaultForm?.index
    );
    if (onClose) onClose();
  };

  useEffect(() => {
    if (defaultForm) {
      setValue("date", defaultForm.date);
      setValue("title", defaultForm.title);
      setValue("description", defaultForm.description);
    }
  }, [defaultForm, setValue]);

  useEffect(() => {
    if (!isOpen) {
      resetDetail();
      reset();
    }
  }, [isOpen, resetDetail, reset]);

  return (
    <>
      <Button
        onPress={onOpen}
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
            {defaultForm ? "Update" : "Create"} Task
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
            <Button variant="bordered" type="button" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" type="submit">
              {defaultForm ? "Update" : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
