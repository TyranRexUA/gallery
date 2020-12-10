import { ThunkAction } from 'redux-thunk';
import { addCommentType, commentType, imageType } from '../types/types';
import API from './../API/API';
import { RootState } from './store';

const initialState = {
    image_id: null as null | number,
    imageSrc: '',
    isOpen: false, //if true open ModuleWindow
    comments: [] as commentType[],
    isLoading: false,
    isFormSubmitting: false,
};

type actionsType = ReturnType<typeof setImageSrc> | ReturnType<typeof setImageComments>
    | ReturnType<typeof changeIsOpenModuleWindow> | ReturnType<typeof changeIsLoading>
    | ReturnType<typeof changeIsFormLoading>

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
                image_id: action.image_id,
                isOpen: action.isOpen,
                isLoading: action.isOpen ? true : state.isLoading
            }
        case 'CHANGE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'CHANGE_IS_FORM_SUBMITTING':
            return {
                ...state,
                isFormSubmitting: action.isFormSubmitting
            }
        default: return state;
    }
}

export default imageModuleWindow;
export const setImageSrc = (data: string) => ({ type: 'SET_IMAGE_SRC', payload: data } as const);
export const setImageComments = (data: commentType[]) => ({ type: 'SET_IMAGE_COMMENTS', payload: data } as const);
export const changeIsOpenModuleWindow = (isOpen: boolean, image_id: number | null) => ({ type: 'CHANGE_IS_OPEN', isOpen, image_id } as const);
const changeIsLoading = (isLoading: boolean) => ({ type: 'CHANGE_IS_LOADING', isLoading } as const);
const changeIsFormLoading = (isFormSubmitting: boolean) => ({ type: 'CHANGE_IS_FORM_SUBMITTING', isFormSubmitting } as const);

export const requestImageAndComments = (image_id: number): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        let responseImage = await API.getImage(image_id);
        dispatch(setImageSrc(responseImage.src));
        let responseComments = await API.getComments(image_id);
        dispatch(setImageComments(responseComments));
        dispatch(changeIsLoading(false))
    }
};

export const addComment = (comment: addCommentType): ThunkAction<void, RootState, unknown, actionsType> => {
    return async (dispatch) => {
        dispatch(changeIsFormLoading(true))
        await API.addComment(comment);
        let response = await API.getComments(comment.image_id);
        dispatch(setImageComments(response));
        dispatch(changeIsFormLoading(false))
    }
};