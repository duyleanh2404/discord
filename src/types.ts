import { Member, Profile, Server } from '@prisma/client';

export type MemberRole = 'ADMIN' | 'MODERATOR' | 'GUEST';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
