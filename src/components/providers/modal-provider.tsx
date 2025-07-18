import { InviteModal } from '@/components/modals/invite-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';

export const ModalProvder = () => {
  return (
    <>
      <InviteModal />
      <EditServerModal />
      <CreateServerModal />
    </>
  );
};
