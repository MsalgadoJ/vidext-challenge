import { Button } from './ui/button';
import { ThumbsUpIcon } from 'lucide-react';

export default function VideoDetails({ videoDetails, updateLikes, videoId }) {
  function handleLikeEvent() {
    console.log('en el like', videoId);
    updateLikes.mutate({ videoId });
  }
  return (
    <div className="flex flex-col">
      <Button className="self-end">
        {' '}
        <ThumbsUpIcon
          className="mr-2 h-4 w-4"
          onClick={async () => handleLikeEvent()}
        />{' '}
        Like
      </Button>
      <div>
        <p>{`views: ${videoDetails?.playCount}`}</p>
        <p>{`Likes: ${videoDetails?.likes}`}</p>
      </div>
      <p>Description</p>
    </div>
  );
}
