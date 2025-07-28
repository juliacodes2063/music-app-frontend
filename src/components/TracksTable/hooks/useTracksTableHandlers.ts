import { useRef, useState, useCallback } from "react";
import { Track } from "../../../types/track";

export const useTracksTableHandlers = (
  onUploadClick: (track: Track) => void,
  onDeletingClick: (track: Track) => void,
  onEditClick: (track: Track) => void,
) => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = useCallback(
    (track: Track) => {
      if (playingTrackId === track.id) {
        audioRef.current?.pause();
        setPlayingTrackId(null);
        setPlayingTrack(null);
        setProgress(0);
      } else {
        audioRef.current?.pause();
        setPlayingTrackId(track.id);
        setPlayingTrack(track);
        setProgress(0);
        setTimeout(() => {
          audioRef.current?.play();
        }, 0);
      }
    },
    [playingTrackId]
  );

  const handleUpload = useCallback((track: Track) => {
    onUploadClick(track);
  }, [onUploadClick]);

  const handleEdit = useCallback((track: Track) => {
    onEditClick(track);
  }, [onEditClick]);

  const handleDelete = useCallback((track: Track) => {
    onDeletingClick(track);
  }, [onDeletingClick]);

  return {
    playingTrackId,
    playingTrack,
    audioRef,
    handleTogglePlay,
    handleUpload,
    handleEdit,
    handleDelete,
    setPlayingTrack,
    setPlayingTrackId,
    setProgress,
    progress
  };
};
