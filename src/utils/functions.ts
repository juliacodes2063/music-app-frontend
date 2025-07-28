import { InputModel, Track } from '../types/track';

export function inputModelsToObject(models: InputModel[]): Record<string, string | string[]> {
  return models.reduce((acc, model) => {
    if (model.value !== undefined) {
      acc[model.key] = model.value;
    }
    return acc;
  }, {} as Record<string, string | string[]>);
}

export function applyTrackToFormModel(formModel: InputModel[], track: Track): InputModel[] {
    return formModel.map(field => {
      const key = field.key as keyof Track;
      if (key in track) {
        return { ...field, value: track[key] };
      }
      return field;
    });
  }


  export function validateTrackModel(models: InputModel[]): {
    isValid: boolean;
    updatedModel: InputModel[];
  } {
    const latinRegex = /^[A-Za-z0-9\s.,:;!?'"()-]*$/;
  
    let isValid = true;
  
    const updatedModel = models.map(field => {
      if (!field.validate) return field;
  
      const raw = typeof field.value === 'string' ? field.value : '';
      const value = raw.trim();
  
      if (!value) {
        isValid = false;
        return { ...field, error: 'This field is required' };
      }
  
      if (!latinRegex.test(value)) {
        isValid = false;
        return { ...field, error: 'Only Latin characters allowed' };
      }
  
      return { ...field, error: undefined };
    });
  
    return { isValid, updatedModel };
  }



    
  