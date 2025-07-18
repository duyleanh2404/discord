import { InviteModal } from '@/components/modals/invite-modal';
import { MembersModal } from '@/components/modals/members-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';

export const ModalProvder = () => {
  return (
    <>
      <InviteModal />
      <MembersModal />
      <EditServerModal />
      <CreateServerModal />
    </>
  );
};
