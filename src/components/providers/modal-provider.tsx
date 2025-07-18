import { InviteModal } from '@/components/modals/invite-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';

export const ModalProvder = () => {
  return (
    <>
      <InviteModal />
      <CreateServerModal />
    </>
  );
};
