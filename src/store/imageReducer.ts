import { ThunkAction } from 'redux-thunk';
import { imageType } from '../types/types';
import API from './../API/API';
import { RootState } from './store';

const initialState = {
    images: [] as imageType[],
    isLoading: false
};

type actionsType = ReturnType<typeof setImages> | ReturnType<typeof changeIsLoading>

const imageReducer = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case 'SET_IMAGES':
            return {
                ...state,
                images: action.payload
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default: return state;
    }
}

export default imageReducer;
const setImages = (data: imageType[]) => ({ type: 'SET_IMAGES', payload: data } as const);
const changeIsLoading = (isLoading: boolean) => ({type: 'SET_IS_LOADING', isLoading} as const)

export const requestImages = (): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        dispatch(changeIsLoading(true));
        let response = await API.getImages();
        dispatch(setImages(response));
        dispatch(changeIsLoading(false));
    }
};