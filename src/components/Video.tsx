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
import VideoDetails from './VideoDetails';
import { api } from '@/app/_trpc/Provider';
import { useEffect, useState } from 'react';

type Video = {
  videoId: null;
  playCount: number;
  likes: number;
};

export default function Video({ videoId, url, thumbnail }) {
  const updateCount = api.videos.incrementPlayCount.useMutation({
    onSuccess: (data) => {
      console.log('data', data);
    },
  });
  return (
    <div>
      <MediaController>
        <video
          slot="media"
          src={url}
          poster={thumbnail}
          preload="auto"
          muted
          crossOrigin=""
          onPlay={() => console.log(updateCount.mutate({ videoId }))}
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
