import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsOpenModuleWindow, requestImageAndComments } from '../../store/imageModuleWindow';
import { requestImages } from '../../store/imageReducer';
import { RootState } from '../../store/store';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const ModuleWindow: React.FC = () => {
    const dispatch = useDispatch()
    const imageId = useSelector((state: RootState) => state.imageModuleWindow.image_id)
    const imageSrc = useSelector((state: RootState) => state.imageModuleWindow.imageSrc)
    const comments = useSelector((state: RootState) => state.imageModuleWindow.comments)
    const isLoading = useSelector((state: RootState) => state.imageModuleWindow.isLoading)

    useEffect(() => {
        if (imageId) {
            dispatch(requestImageAndComments(imageId))
        }
    }, [imageId])

    const closeModalWindow = () => {
        dispatch(changeIsOpenModuleWindow(false, null))
    }

    return (
        <div>
            <div>
                {isLoading
                    ? <div />

                    : <>
                        <div onClick={closeModalWindow}>X</div>
                        <img src={imageSrc} alt="" />

                        {comments.length > 0 && comments.map(comment =>
                            <div key={comment.id}>
                                <div>
                                    {comment.name}
                                </div>

                                <div>
                                    {comment.description}
                                </div>
                            </div>
                        )}

                        {imageId &&
                            <AddCommentForm image_id={imageId} />
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default memo(ModuleWindow);