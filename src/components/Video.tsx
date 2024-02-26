'use client';
import { api } from '@/app/_trpc/Provider';
import { useRouter, useParams } from 'next/navigation';
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

interface VideoProps {
  url: string;
  thumbnail: string;
}

export default function Video({ url, thumbnail }: VideoProps) {
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
          tabIndex={0}
        />
        <div className="centered-controls-overlay" slot="centered-chrome">
          <MediaSeekBackwardButton tabIndex={0}></MediaSeekBackwardButton>
          <MediaPlayButton tabIndex={0}></MediaPlayButton>
          <MediaSeekForwardButton tabIndex={0}></MediaSeekForwardButton>
        </div>
        <MediaControlBar>
          <MediaPlayButton tabIndex={0}></MediaPlayButton>
          <MediaSeekBackwardButton tabIndex={0}></MediaSeekBackwardButton>
          <MediaSeekForwardButton tabIndex={0}></MediaSeekForwardButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton tabIndex={0}></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
