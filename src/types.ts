import { NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

import { Member, Profile, Server } from '@prisma/client';

export type MemberRole = 'ADMIN' | 'MODERATOR' | 'GUEST';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
