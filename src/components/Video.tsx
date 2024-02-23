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

export default function VideoList({ video }) {
  return (
    <div>
      {video}
      <MediaController>
        <video
          slot="media"
          src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
          preload="auto"
          muted
          crossOrigin=""
          tabIndex={0}
          onPlay={() => console.log('hello')}
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
      <VideoDetails />
    </div>
  );
}
