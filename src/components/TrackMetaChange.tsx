import { useEffect } from "react";
import { useGetGenresQuery } from "../store/services/genresApi";
import { InputModel, Track } from "../types/track";
import FormModel from "./FormModels/FormModels";
import { useCreateTrackMutation, useLazyGetTrackBySlugQuery, useUpdateTrackMutation } from "../store/services/musicApi";
import { applyTrackToFormModel, inputModelsToObject, validateTrackModel } from "../utils/functions";
import { toast } from "react-toastify";
import { trackFormModel } from "./FormModels/formModelsConfig";

interface Props {
    trackModel: InputModel[];
    setTrackModel: (models: InputModel[]) => void;
    setModalContent: (value: null) => void;
    selectedTrack: Track | null;
    setSelectedTrack: (value: null) => void

}

const TrackMetaChange: React.FC<Props> = ({
    trackModel,
    setTrackModel,
    setModalContent,
    selectedTrack,
    setSelectedTrack

}) => {

    const { data: genres = [] } = useGetGenresQuery();

    const [createTrack] = useCreateTrackMutation();
    const [updateTrack] = useUpdateTrackMutation();
    const [fetchTrack] = useLazyGetTrackBySlugQuery();

    const handleSave = async () => {
        const { isValid, updatedModel } = validateTrackModel(trackModel);

        if (!isValid) {
            setTrackModel(updatedModel);
            toast.error(
                <div data-testid="toast-error">
                    Please correct the highlighted fields.
                </div>
            );
            return;
        }

        const payload = inputModelsToObject(updatedModel);

        try {
            if (selectedTrack) {
                await updateTrack({ id: selectedTrack.id, data: payload }).unwrap();
                toast.success(
                    <div data-testid="toast-success">
                        Track updated!
                    </div>
                );
            } else {
                await createTrack(payload).unwrap();
                toast.success(
                    <div data-testid="toast-success">
                        Track created!
                    </div>

                );
            }

            setModalContent(null);
            setTrackModel([]);
            setSelectedTrack(null);
        } catch (error) {
            toast.error(
                <div data-testid="toast-error">
                    Error saving track.
                </div>
            );
            console.error(error);
        }
    };

    useEffect(() => {
        const loadTrack = async () => {
            let model: InputModel[];

            if (selectedTrack) {
                try {
                    const result = await fetchTrack(selectedTrack.slug).unwrap();
                    model = applyTrackToFormModel(trackFormModel, result);
                } catch (error) {
                    toast.error(
                        <div data-testid="toast-error">
                            Track not found
                        </div>
                    );
                    console.error(error);
                    model = trackFormModel;
                }
            } else {
                model = trackFormModel;
            }

            if (genres.length) {
                const updated = model.map(m =>
                    m.key === 'genres' ? { ...m, values: genres } : m
                );
                setTrackModel(updated);
            }
        };

        loadTrack();
    }, [genres, selectedTrack]);

    return (
        <div className="flex flex-col">
            <FormModel inputModels={trackModel} setInputModels={setTrackModel} />
            <button
                onClick={handleSave}
                className="primary p-0 text-[6px] leading-none md:p-2 md:text-base rounded-sm bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer"
                data-testid="submit-button"
            >
                Save
            </button>
        </div>

    )
};

export default TrackMetaChange;
