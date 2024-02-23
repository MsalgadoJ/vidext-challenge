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

export default function VideoList({ videoId }) {
  const [videoInfo, setVideoInfo] = useState<Video>(null);

  const createVideo = api.videos.createVideo.useMutation({
    onSuccess: (data) => {
      setVideoInfo(videoInfo ?? data[0] ?? null);
    },
  });

  useEffect(() => {
    // we need to call the mutation here to avoid endless loop
    const getVideo = createVideo.mutate({ videoId });
  }, []);

  const updateCount = api.videos.incrementPlayCount.useMutation({
    onSuccess: (data) => {
      setVideoInfo((prevInfo) => ({
        ...prevInfo,
        playCount: data[0].updatedCount,
      }));
    },
  });

  const updateLikes = api.videos.incrementLikesCount.useMutation({
    onSuccess: (data) => {
      console.log('data', data);
      setVideoInfo((prevInfo) => ({
        ...prevInfo,
        likes: data[0].updatedLikesCount,
      }));
    },
  });

  return (
    <div>
      {videoId}
      <MediaController>
        <video
          slot="media"
          src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
          preload="auto"
          muted
          crossOrigin=""
          tabIndex={0}
          onPlay={() => updateCount.mutate({ videoId })}
        />
        <MediaControlBar>
          <MediaPlayButton
            tabIndex={0}
            arial-label="video-player"
            role="button"
          ></MediaPlayButton>
          <MediaSeekBackwardButton></MediaSeekBackwardButton>
          <MediaSeekForwardButton></MediaSeekForwardButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
        </MediaControlBar>
      </MediaController>

      <VideoDetails
        videoDetails={videoInfo}
        updateLikes={updateLikes}
        setVideoInfo={setVideoInfo}
        videoId={videoId}
      />
    </div>
  );
}
