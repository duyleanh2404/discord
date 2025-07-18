'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import z from 'zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModal } from '@/hooks/use-modal-store';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.'
  })
});

export const EditServerModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const { server } = data;
  const isModalOpen = isOpen && type === 'editServer';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  });

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name);
      form.setValue('imageUrl', server.imageUrl);
    }
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values);
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a game and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Enter server name"
                        className="!bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                {isLoading && <Loader className="size-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
