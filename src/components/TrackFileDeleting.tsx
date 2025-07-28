import { useDeleteTrackMutation } from '../store/services/musicApi';
import { Track } from '../types/track';
import { Loader } from './common/Loader/Loader';
import { toast } from 'react-toastify';

interface TrackFileDeletingProps {
  track: Track;
  setModalContent: (value: null) => void;
  setSelectedTrack: (value: null) => void
}

const TrackFileDeleting: React.FC<TrackFileDeletingProps> = ({ track, setModalContent, setSelectedTrack }) => {
  const [deleteTrack, { isLoading }] = useDeleteTrackMutation();

  const handleConfirmDelete = async () => {
    try {
      await deleteTrack(track.id).unwrap();
      toast.success(
        <div data-testid="toast-success">
          Track deleted successfully!
        </div>
      );
      setModalContent(null);
      setSelectedTrack(null)
    } catch (err) {
      toast.error(
        <div data-testid="toast-error">
          Error deleting track
        </div>
      );
      console.error(err);
    }
  };

  const handleReturn = () => {
    setModalContent(null);
    setSelectedTrack(null)
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-w-[250px]" data-testid="confirm-dialog">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="text-sm text-gray-300 text-center">
            Are you sure you want to delete this track? This action cannot be undone.
          </p>
          <div className="flex gap-10">
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              data-testid="confirm-delete"
            >
              Yes, delete it
            </button>

            <button
              onClick={handleReturn}
              className="primary px-4 py-2  text-white rounded transition"
              data-testid="cancel-delete"
            >
              Return
            </button>
          </div>


        </>
      )}
    </div>
  );
};

export default TrackFileDeleting;
