import { useEffect, useState } from "react";
import TracksTable from "../components/TracksTable";
import Modal from "../components/common/Modal";
import TrackFileUploader from "../components/TrackFileUploader";
import TrackFileDeleting from "../components/TrackFileDeleting";
import ClearButton from "../components/common/buttons/ClearButton";
import { InputModel, Track } from "../types/track";
import TrackMetaChange from "../components/TrackMetaChange";
import { GetTracksParams, useLazyGetTracksQuery } from "../store/services/musicApi";
import { SortingState } from "@tanstack/react-table";
import AnimatedSearchBar from "../components/AnimatedSearchBar";

type ModalContentType = 'addTrack' | 'editTrack' | 'uploadTrackFile' | 'deleteTrackFile' | null;

export function TracksPage() {
    const [modalContent, setModalContent] = useState<ModalContentType>(null);
    const [trackModel, setTrackModel] = useState<InputModel[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [search, setSearch] = useState<string>('')
    
    const [sorting, setSorting] = useState<SortingState>([]);
    
    const [getTracks, { data: lazyData, isLoading: isLoadingLazy }] = useLazyGetTracksQuery();
    
    useEffect(() => {
    
        const { artist, genres } = filters;
    
        const requestPayload: GetTracksParams = {
          page: currentPage,
          limit: 10,
        };
    
        requestPayload.search = search;
    
        requestPayload.genre = genres;
        requestPayload.artist = artist;
    
    
        if (sorting[0]?.id) {
          requestPayload.sort = sorting[0]?.id as 'title' | 'artist' | 'album' | 'createdAt';
          requestPayload.order = sorting[0]?.desc ? 'desc' : 'asc';
        }
    
        getTracks(requestPayload);
    
      }, [currentPage, filters, sorting, search, getTracks]);

    const openAddTrack = () => {
        setModalContent('addTrack');
    };

    const openEditTrack = (track: Track) => {
        setSelectedTrack(track);
        setModalContent('editTrack');
    };

    const openUploadFile = (track: Track) => {
        setSelectedTrack(track);
        setModalContent('uploadTrackFile');
    };

    const openDeletingFile = (track: Track) => {
        setSelectedTrack(track);
        setModalContent('deleteTrackFile');
    };

    const getModalTitle = (content: ModalContentType): string => {
        if (!content) return '';

        return content
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 data-testid="tracks-header" className="text-2xl font-bold">Track List</h1>
                    <AnimatedSearchBar  
                        onSearch={setSearch}
                    />
                </div>
            <div className="relative">
                <ClearButton
                    onClick={openAddTrack}
                    data-testid="create-track-button"
                    className="button z-[20] absolute text-[6px] top-[20px] right-1 -translate-y-1/2 "
                >
                    + Add music
                </ClearButton>

                <TracksTable
                    onUploadClick={openUploadFile}
                    onDeletingClick={openDeletingFile}
                    onEditClick={openEditTrack}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    filters={filters}
                    setFilters={setFilters}
                    sorting={sorting}
                    setSorting={setSorting}
                    lazyData={lazyData}
                    isLoadingLazy={isLoadingLazy}
                />

                <Modal
                    open={modalContent !== null}
                    onOpenChange={(open) => !open && setModalContent(null)}
                    title={getModalTitle(modalContent)}
                >
                    {(modalContent === 'addTrack' || modalContent === 'editTrack') && (
                        <TrackMetaChange
                            trackModel={trackModel}
                            setTrackModel={setTrackModel}
                            setModalContent={setModalContent}
                            selectedTrack={selectedTrack}
                            setSelectedTrack={setSelectedTrack}
                        />
                    )}

                    {modalContent === 'uploadTrackFile' && selectedTrack && (
                        <TrackFileUploader
                            track={selectedTrack}
                            setModalContent={setModalContent}
                            setSelectedTrack={setSelectedTrack}
                        />
                    )}

                    {modalContent === 'deleteTrackFile' && selectedTrack && (
                        <TrackFileDeleting
                            track={selectedTrack}
                            setModalContent={setModalContent}
                            setSelectedTrack={setSelectedTrack}
                        />
                    )}

                </Modal>
            </div>
        </>
    );
}