import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedbackSuccessStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackSuccessStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault()
    console.log({screenshot, comment})
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type='button'
          className='top-5 left-5 text-zinc-400 hover:text-zinc-100 absolute'
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.source}
            className='w-6 h-6'
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder:text-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes o que está acontecendo...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />
          <button
            type='submit'
            disabled={comment.length === 0}
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-700 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500'
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
