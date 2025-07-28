import { InputModel } from "../../types/track";


export const trackFormModel: InputModel[] = [
  {
    key: 'title',
    name: 'Title',
    type: 'string',
    value: '',
    placeholder: 'Enter track title',
    validate: true,
  },
  {
    key: 'artist',
    name: 'Artist',
    type: 'string',
    value: '',
    placeholder: 'Enter artist name',
    validate: true,
   
  },
  {
    key: 'album',
    name: 'Album',
    type: 'string',
    value: '',
    placeholder: 'Enter album name (optional)',
    
  },
  {
    key: 'genres',
    name: 'Genres',
    type: 'tagInput',
    value: [],
    values: [],
    testId: "genre-selector",
    testIdError: "error-genre"
  },
];
