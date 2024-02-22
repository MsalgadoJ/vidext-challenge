import { Button } from './ui/button';
import { ThumbsUpIcon } from 'lucide-react';

export default function VideoDetails() {
  return (
    <div className="flex flex-col">
      <Button className="self-end">
        {' '}
        <ThumbsUpIcon className="mr-2 h-4 w-4" /> Like
      </Button>
      <p>Description</p>
    </div>
  );
}
