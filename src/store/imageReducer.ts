import { ThunkAction } from 'redux-thunk';
import { imageType } from '../types/types';
import API from './../API/API';
import { RootState } from './store';

const initialState = {
    images: [] as imageType[],
};

type actionsType = ReturnType<typeof setImages>

const imageReducer = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case 'SET_IMAGES':
            return {
                ...state,
                images: action.payload
            };
        default: return state;
    }
}

export default imageReducer;
const setImages = (data: imageType[]) => ({ type: 'SET_IMAGES', payload: data } as const);

export const requestImages = (): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        let response = await API.getImages();
        dispatch(setImages(response));
    }
};