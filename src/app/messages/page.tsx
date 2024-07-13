import { P, Picture } from '@/components/atoms';
import { Column } from '@/components/layout';
import React from 'react';

export default function MessagesDefaultPage() {
  return (
    <div className='h-full flex items-center justify-center border'>
      <Column className='items-center gap-4'>
        <Picture 
          container={{
            className: "w-[200px] h-[150px]"
          }}
          image={{
            alt: "",
            src: "/images/chat-bg.png"
          }}
        />
        <Column className='items-center gap-1'>
          <P className='text-grey-300 font-bold text-xl'>Start a conversation</P>
          <P className='text-grey-200'>Click on a chat to start a conversation</P>
        </Column>
      </Column>
    </div>
  );
}
