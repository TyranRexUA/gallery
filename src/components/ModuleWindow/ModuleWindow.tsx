import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsOpenModuleWindow, requestImageAndComments } from '../../store/imageModuleWindow';
import { requestImages } from '../../store/imageReducer';
import { RootState } from '../../store/store';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import s from './ModuleWindow.module.scss'

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
        document.body.classList.remove('lock')
        dispatch(changeIsOpenModuleWindow(false, null))
    }

    return (
        <div className={s.ModuleLayer}>
            <div className={s.ModuleWindow}>
                {isLoading
                    ? <div className={s.preloader} />

                    : <>
                        <div className={s.ModuleWindow__closeBtn} onClick={closeModalWindow} />
                        <div className={s.ModuleWindow__imgContainer}>
                            <div className={s.ModuleWindow__img}>
                                <img src={imageSrc} alt="" />
                            </div>
                        </div>

                        <div className={s.ModuleWindow__comments}>

                            {comments.length > 0 && comments.map(comment =>
                                <div className={s.comment} key={comment.id}>
                                    {
                                        // because API has not comment.date
                                    }
                                    <div className={s.comment__name}>
                                        {comment.name}
                                    </div>

                                    <div className={s.comment__desc}>
                                        {comment.description}
                                    </div>
                                </div>
                            )}

                        </div>

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