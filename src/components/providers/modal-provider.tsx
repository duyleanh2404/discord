import { InviteModal } from '@/components/modals/invite-modal';
import { MembersModal } from '@/components/modals/members-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { EditChannelModal } from '@/components/modals/edit-channel-modal';
import { LeaveServerModal } from '@/components/modals/leave-server-modal';
import { DeleteServerModal } from '@/components/modals/delete-server-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { DeleteChannelModal } from '@/components/modals/delete-channel-modal';

export const ModalProvder = () => {
  return (
    <>
      <InviteModal />
      <MembersModal />
      <EditServerModal />
      <EditChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <CreateServerModal />
      <DeleteChannelModal />
      <CreateChannelModal />
    </>
  );
};
