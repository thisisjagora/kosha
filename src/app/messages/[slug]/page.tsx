"use client";
import { Send } from '@/components/Icons';
import { Button } from '@/components/atoms';
import { Form } from '@/components/form';
import { Row } from '@/components/layout';
import { DM, DMContent, DMFooter, DMHeader } from '@/components/messaging';
import { Textarea } from '@/components/textarea';
import { Tooltip } from '@/components/tooltip';
import { Paperclip } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function MessagePage({ params }: { params: { slug: string } }) {
  const form = useForm();
  return (
    <DM>
      <DMHeader name='Faith Movers & Delivery' />
      <DMContent></DMContent>
      <DMFooter>
        <Form {...form}>
          <form
            className="w-full relative overflow-hidden flex flex-row items-center" x-chunk="dashboard-03-chunk-1"
          >
                  <Row className='flex-1 w-full h-14 items-center gap-0 bg-grey-700 rounded-md'>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        rows={1}
                        className="bg-transparent border-0 outline-none min-h-full resize-none flex-1 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Tooltip
                        trigger= {
                            <Button variant="ghost" size="icon">
                              <Paperclip className="size-4" />
                              <span className="sr-only">Attach file</span>
                            </Button>
                          }
                          content="Attaach File"
                      />
                  </Row>
                  <Button variant="ghost" className='bg-transparent hover:bg-transparent max-w-max'>
                    <Send className='w-[40px] h-[40px]' />
                  </Button>
          </form>
        </Form>
      </DMFooter>
    </DM>
  )
}
