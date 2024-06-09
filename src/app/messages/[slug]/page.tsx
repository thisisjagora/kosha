"use client";
import { Send, Smiley } from '@/components/Icons';
import { Button } from '@/components/atoms';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form';
import { Row } from '@/components/layout';
import { DM, DMContent, DMFooter, DMHeader } from '@/components/messaging';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Textarea } from '@/components/textarea';
import { Tooltip } from '@/components/tooltip';
import { Paperclip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react';
import { z } from 'zod';
import { sendMessageSchema } from '@/core/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/input';

export default function MessagePage({ params }: { params: { slug: string } }) {
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema)
  });
  const onSubmit = (data:z.infer<typeof sendMessageSchema>) => {
    console.log(data);
  }

  const [messageContent, setMessageContent] = useState('');

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DM>
      <DMHeader name='Faith Movers & Delivery' />
      <DMContent></DMContent>
      <DMFooter>
        <Form {...form}>
          <form
            className="w-full relative overflow-hidden flex flex-row items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {isMounted && (
              <Popover>
                <PopoverTrigger>
                  <Button type='button' className='p-0 bg-transparent hover:bg-transparent max-w-max'>
                    <Smiley className='w-[25px] h-[25px]' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='absolute bottom-20 z-10 w-full p-0 border-0 bg-transparent rounded shadow-lg'>
                  <EmojiPicker
                    width={350}
                    height={400}
                    onEmojiClick={(emojiObject) => {
                      setMessageContent(prev => prev + emojiObject.emoji);
                      form.setValue("message", messageContent + emojiObject.emoji);
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
            <Row className='flex-1 w-full h-14 items-center px-2 bg-grey-700 rounded-md'>
              <FormField 
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <Textarea
                      {...field}
                      value={messageContent}
                      onChange={(e) => {
                        setMessageContent(e.target.value);
                        field.onChange(e);
                      }}
                      id="message"
                      placeholder="Type your message here..."
                      rows={1}
                      className="text-base bg-transparent border-0 outline-none min-h-full resize-none p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormItem>
                )}
              />
              <FormField 
                name="file"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="file">
                      <Tooltip
                        trigger= {
                          <span>
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </span>
                        }
                        content="Attach File"
                      />
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        id="file" 
                        className="hidden" 
                        multiple
                        onChange={(e) => {
                          if(e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Row>
            <Button type="submit" variant="ghost" className='p-0 bg-transparent hover:bg-transparent max-w-max'>
              <Send className='w-[40px] h-[40px]' />
            </Button>
          </form>
        </Form>
      </DMFooter>
    </DM>
  )
}
