import { ChatTeardropDots } from 'phosphor-react';
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm';

export function Widget() {

  return (
    <Popover className='absolute bottom-5 right-5 md:bottom-8 md:right-8 flex flex-col items-end'>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button
        className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group hover:bg-brand-400 transition-colors duration-500'
      >
        <ChatTeardropDots className='w-6 h-6' />
        <span className='max-w-0 overflow-hidden transition-all duration-500 ease-linear group-hover:max-w-xs'>
          <span className='pl-2' />
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
