import { useMemo } from 'react';
import Table from '../common/Table';
import { useTracksTableHandlers } from './hooks/useTracksTableHandlers';
import { Loader } from '../common/Loader/Loader';
import { useTracksTableColumns } from './hooks/useTracksTableColumns';
import { Track, TrackListResponse } from '../../types/track';
import { SortingState } from '@tanstack/react-table';
import { BASE_URL } from '../../api/url';

interface TracksTableProps {
  onUploadClick: (track: Track) => void;
  onDeletingClick: (track: Track) => void;
  onEditClick: (track: Track) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  lazyData: TrackListResponse | undefined;
  isLoadingLazy: boolean;
}

const TracksTable: React.FC<TracksTableProps> = ({ 
  onUploadClick, 
  onDeletingClick, 
  onEditClick,
  currentPage,
  setCurrentPage,
  filters,
  setFilters,
  sorting,
  setSorting,
  lazyData,
  isLoadingLazy
}) => {

  const memoizedData = useMemo(() => lazyData?.data ?? [], [lazyData]);

  const {
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
  } = useTracksTableHandlers(
    onUploadClick,
    onDeletingClick,
    onEditClick
  );

  const memoizedColumns = useTracksTableColumns({
    playingTrackId,
    handleTogglePlay,
    handleUpload,
    handleEdit,
    handleDelete,
    isLoadingLazy
  });


  if (isLoadingLazy) return (
    <div
      className="w-[750px] h-[605px] flex justify-center items-center"
      data-testid="loading-tracks"
      data-loading="true"
    >
      <Loader />
    </div>
  );

  return (
    <>
      <Table
        data={memoizedData}
        columns={memoizedColumns}
        totalPages={lazyData?.meta?.totalPages ?? 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onFilterChange={setFilters}
        onSortChange={setSorting}
        sorting={sorting}
        filters={filters}
        playingTrackId={playingTrackId}
      />

      {playingTrackId && (
        <audio
          ref={audioRef}
          src={`${BASE_URL}/files/${encodeURIComponent(playingTrack?.audioFile ?? '')}`}
          autoPlay
          onTimeUpdate={() => {
            const audio = audioRef.current;
            if (audio) {
              const value = (audio.currentTime / audio.duration) * 100 || 0;
              setProgress(value);
            }
          }}
          onEnded={() => {
            const currentIndex = memoizedData.findIndex(t => t.id === playingTrackId);
            const next = memoizedData[currentIndex + 1];
            if (next?.audioFile) {
              handleTogglePlay(next);
            } else {
              setPlayingTrackId(null);
              setPlayingTrack(null);
            }
          }}
          data-testid={`audio-player-${playingTrackId}`}
          style={{ display: 'none' }}
        />
      )}

      {playingTrack && (
        <div
          data-testid={`audio-progress-${playingTrack.id}`}
          className="fixed top-0 left-0 right-0 h-[4px] bg-gray-200 z-50"
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gray-500 transition-all duration-200"
          />
        </div>
      )}
    </>


  );
};

export default TracksTable;
