import { Button, Modal } from "@mantine/core"

interface ConfirmModalProps {
  opened: boolean;
  title: string;
  confirmAction: () => void;
  cancelAction: () => void;
}

export const ConfirmModal = ({ opened, title, confirmAction, cancelAction }: ConfirmModalProps) => {

  return (
    <Modal
      title={title}
      opened={opened}
      onClose={cancelAction}
      centered
      withCloseButton={true}
      styles={{
        body: {
          display: 'flex',
          alignItems: 'center',
          background: '#aaa',
          justifyContent: 'center',
          padding: '3rem',
        }
      }}
      children={
        <Button
          onClick={confirmAction}
          autoContrast variant='gradient' gradient={{ from: 'teal', to: 'lime', deg: 135 }} style={{ width: '40%' }}>
          Do it
        </Button>
      }
    >

    </Modal>
  );
}