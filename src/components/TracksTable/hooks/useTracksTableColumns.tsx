import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaPlay, FaStop, FaTrash, FaUpload } from 'react-icons/fa'
import { Track } from '../../../types/track'
import { useMemo } from 'react'
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice'

interface UseTracksTableColumnsProps {
  playingTrackId: string | null
  handleTogglePlay: (track: Track) => void
  handleUpload: (track: Track) => void
  handleEdit: (track: Track) => void
  handleDelete: (track: Track) => void
  isLoadingLazy: boolean
}

export const useTracksTableColumns = ({
  playingTrackId,
  handleTogglePlay,
  handleUpload,
  handleEdit,
  handleDelete,
  isLoadingLazy
}: UseTracksTableColumnsProps): ColumnDef<Track, unknown>[] => {
  const isTouch = useIsTouchDevice()

  return useMemo(() => [
    { accessorKey: 'title', header: 'Title', enableColumnFilter: false, size: 100 },
    { accessorKey: 'artist', header: 'Artist', size: 100 },
    { accessorKey: 'genres', header: 'Genres', enableSorting: false, size: 100 },
    { accessorKey: 'album', header: 'Album', enableColumnFilter: false, size: 100 },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      enableColumnFilter: false,
      size: 250,

      cell: ({ row }) => {
        const track = row.original
        const isPlaying = playingTrackId === track.id

        const iconSizeClass = 'w-[10px] h-[10px] md:w-4 md:h-4'

        const actionButtons = [
          track.audioFile && {
            icon: isPlaying
              ? <FaStop className={iconSizeClass} />
              : <FaPlay className={iconSizeClass} />,
            onClick: () => handleTogglePlay(track),
            testId: isPlaying
              ? `pause-button-${track.id}`
              : `play-button-${track.id}`
          },
          {
            icon: <FaUpload className={iconSizeClass} />,
            onClick: () => handleUpload(track),
            testId: `upload-track-${track.id}`,
          },
          {
            icon: <FaEdit className={iconSizeClass} />,
            onClick: () => handleEdit(track),
            testId: `edit-track-${track.id}`,
          },
          {
            icon: <FaTrash className={iconSizeClass} />,
            onClick: () => handleDelete(track),
            testId: `delete-track-${track.id}`,
          },
        ].filter(Boolean) as {
          icon: React.ReactNode;
          onClick: () => void;
          testId?: string;
        }[];



        return (
          <div
            className={`
            flex items-center justify-end
            gap-[10px] md:gap-3
            transition-opacity duration-200
            ${isPlaying ? 'lg:opacity-100 lg:visible' : ''}
            ${!isTouch ? 'lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible' : 'opacity-100 visible'}
          `}
          >
            {actionButtons.map((btn, i) => (
              <button
                disabled={isLoadingLazy}
                aria-disabled={isLoadingLazy}
                key={i}
                onClick={btn.onClick}
                data-testid={btn.testId}
                className="primary p-0 text-[6px] leading-none md:p-2 md:text-base rounded-sm bg-[#1a1a1a]"
              >
                {btn.icon}
              </button>
            ))}
          </div>
        )
      }

    },
  ], [
    playingTrackId,
    handleTogglePlay,
    handleUpload,
    handleEdit,
    handleDelete,
    isTouch
  ])
}
