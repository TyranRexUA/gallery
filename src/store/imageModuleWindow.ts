import { ThunkAction } from 'redux-thunk';
import { commentType, imageType } from '../types/types';
import API from './../API/API';
import { RootState } from './store';

const initialState = {
    imageSrc: '',
    isOpen: false, //if true open ModuleWindow
    comments: [] as commentType[],
};

type actionsType = ReturnType<typeof setImageSrc> | ReturnType<typeof setImageComments> | ReturnType<typeof changeIsOpenModuleWindow>

const imageModuleWindow = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case 'SET_IMAGE_SRC':
            return {
                ...state,
                imageSrc: action.payload
            };
        case 'SET_IMAGE_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }
        case 'CHANGE_IS_OPEN':
            return {
                ...state,
                isOpen: action.isOpen
            }
        default: return state;
    }
}

export default imageModuleWindow;
export const setImageSrc = (data: string) => ({ type: 'SET_IMAGE_SRC', payload: data } as const);
export const setImageComments = (data: commentType[]) => ({ type: 'SET_IMAGE_COMMENTS', payload: data } as const);
export const changeIsOpenModuleWindow = (isOpen: boolean) => ({ type: 'CHANGE_IS_OPEN', isOpen } as const);

export const requestImage = (image_id: number): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        let response = await API.getImage(image_id);
        dispatch(setImageSrc(response.src));
    }
};

export const requestComments = (image_id: number): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        let response = await API.getComments(image_id);
        dispatch(setImageComments(response));
    }
};

export const addComment = (image_id: number, name: string, description: string): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        await API.addComment(image_id, name, description);
        dispatch(requestComments(image_id));
    }
};