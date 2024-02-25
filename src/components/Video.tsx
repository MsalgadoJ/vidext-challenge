'use client';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
} from 'media-chrome/dist/react';
import { api } from '@/app/_trpc/Provider';
import { useRouter, useParams } from 'next/navigation';

type Video = {
  videoId: null;
  playCount: number;
  likes: number;
};

export default function Video({ url, thumbnail }) {
  const router = useRouter();
  const { id } = useParams();
  const updateCount = api.videos.incrementPlayCount.useMutation({
    onSettled: () => {
      router.refresh();
    },
  });
  return (
    <div className="pb-4">
      <MediaController>
        <video
          slot="media"
          src={url}
          poster={thumbnail}
          preload="auto"
          muted
          crossOrigin=""
          onPlay={() => updateCount.mutate({ videoId: id as string })}
        />
        <MediaControlBar>
          <MediaPlayButton></MediaPlayButton>
          <MediaSeekBackwardButton></MediaSeekBackwardButton>
          <MediaSeekForwardButton></MediaSeekForwardButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
