import React, { memo, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addComment } from '../../store/imageModuleWindow';
import s from './AddCommentForm.module.scss'

interface propsType {
    image_id: number
}

const AddCommentForm: React.FC<propsType> = ({image_id}) => {
    const dispatch = useDispatch()
    let isSubmitting = useSelector((state: RootState) => state.imageModuleWindow.isFormSubmitting)

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image_id,
        },
        enableReinitialize: true,
        onSubmit: values => {
            dispatch(addComment(values));
            formik.setValues({
                name: '',
                description: '',
                image_id,
            })
        },
        validate: values => {
            const errors = {} as {name: string | null, description: string | null};

            if (!values.name) {
                errors.name = 'Required';
              }
            
              if (!values.description) {
                errors.description = 'Required';
              }
            
              return errors;
        }
    });

    return (
        <form className={s.AddCommentForm} onSubmit={formik.handleSubmit}>
            <div className={s.AddCommentForm__field}>
                <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Ваше имя'/>

                {formik.errors.name && 
                <div className={s.error}>
                    {formik.errors.name}
                </div>}

            </div>

            <div className={s.AddCommentForm__field}>
                <input type="text" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Ваш комментарий'/>
                
                {formik.errors.description && 
                <div className={s.error}>
                    {formik.errors.description}
                </div>}

            </div>

            <button disabled={isSubmitting} type="submit">
                Оставить комментарий
            </button>
        </form>
    );
}

export default memo(AddCommentForm);