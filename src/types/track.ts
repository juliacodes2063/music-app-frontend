export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackListResponse {
  data: Track[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type InputType =
| 'string'
| 'tagInput'
| 'select'
| 'header';


export interface InputModel<T = string | string[]> {
  key: string;
  name?: string;
  title?: string;
  type: InputType;
  value?: T;
  values?: string[]; 
  placeholder?: string;
  validate?: boolean;
  error?: string;
  testId?: string;
  testIdError?: string
}


