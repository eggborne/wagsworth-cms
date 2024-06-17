import { Modal } from "@mantine/core"

interface LoginWindowProps {
  opened: boolean;
}

export const LoginWindow = ({ opened }: LoginWindowProps) => {

  return (
    <Modal
      opened={opened}
      onClose={() => { }}
      centered
      withCloseButton={false}
      size={'max-content'}
      styles={{
        header: { paddingTop: '2rem', backgroundColor: 'transparent' },
        body: { padding: '0.5rem 0', backgroundColor: 'transparent' },        
      }}
    >
      <div id='firebaseAuthContainer'></div>
    </Modal>
  );
}