'use client';

import { useState } from 'react';

import axios from 'axios';
import { Check, Copy, RefreshCcw } from 'lucide-react';

import { useOrigin } from '@/hooks/use-origin';
import { useModal } from '@/hooks/use-modal-store';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';

export const InviteModal = () => {
  const origin = useOrigin();
  const { isOpen, onClose, onOpen, type, data } = useModal();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'invite';

  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen('invite', { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Invite friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-zinc-500 dark:text-secondary/70">Server invite link</Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              readOnly
              disabled={isLoading}
              value={inviteUrl}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            variant="link"
            size="sm"
            className="text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCcw className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
