import { useState, ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import { useUploadTrackFileMutation } from '../store/services/musicApi';
import { Loader } from './common/Loader/Loader';
import { FaUpload } from 'react-icons/fa';
import { Track } from '../types/track';


interface TrackFileUploaderProps {
    track: Track;
    setModalContent: (value: null) => void;
    setSelectedTrack: (value: null) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];

const TrackFileUploader: React.FC<TrackFileUploaderProps> = ({ track, setModalContent, setSelectedTrack }) => {
    const [file, setFile] = useState<File | null>(null);

    const [uploadTrackFile, { isLoading }] = useUploadTrackFileMutation();
    const inputRef = useRef<HTMLInputElement>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        if (!selected) return;

        if (!ALLOWED_TYPES.includes(selected.type)) {
            toast.error(
                <div data-testid="toast-error">
                    Invalid file type. MP3 or WAV only
                </div>
                
            );
            return;
        }

        if (selected.size > MAX_FILE_SIZE) {
            toast.error(
                <div data-testid="toast-error">
                    File is too big. Maximum is 10MB
                </div>
                );
            return;
        }

        setFile(selected);
    };

    const handleClear = () => {
        setFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      };
      

    const handleUpload = async () => {
        if (!file) {
            toast.info(
                <div data-testid="toast-info">
                    Select file before uploading
                </div>
            );
            return;
        }

        try {
            await uploadTrackFile({ id: track.id, file }).unwrap();
            toast.success(
                <div data-testid="toast-success">
                    File uploaded successfully!
                </div>
            );
            setFile(null);
            setModalContent(null);
            setSelectedTrack(null);
        } catch (err) {
            toast.error(
                <div data-testid="toast-error">
                    Error loading file
                </div>
                );
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center" data-testid="confirm-dialog">
            {isLoading ? (
                <div className="flex items-center justify-center h-[40px] w-full">
                    <Loader />
                </div>
            ) : (
                <>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".mp3,.wav"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isLoading}
                    />


                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                    >
                        <FaUpload />
                        Choose file
                    </button>

                    {file && (
                        <div className="text-sm text-gray-300 text-center">
                            <strong>{file.name}</strong><br />
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    )}

                    <div className="flex gap-5">
                        <button
                            onClick={handleUpload}
                            disabled={!file}
                            className={`
      primary p-0 text-[6px] leading-none md:p-2 md:text-base rounded-sm bg-[#1a1a1a]
      ${!file ? 'opacity-50 cursor-default pointer-events-none' : 'hover:bg-[#2a2a2a] cursor-pointer'}
    `}
                        >
                            Upload
                        </button>

                        <button
                            onClick={handleClear}
                            disabled={!file}
                            className={`
      primary p-0 text-[6px] leading-none md:p-2 md:text-base rounded-sm bg-[#1a1a1a]
      ${!file ? 'opacity-50 cursor-default pointer-events-none' : 'hover:bg-[#2a2a2a] cursor-pointer'}
    `}
                        >
                            Clear
                        </button>
                    </div>

                </>
            )}
        </div>
    );
};

export default TrackFileUploader;
