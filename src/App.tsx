import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ModuleWindow from './components/ModuleWindow/ModuleWindow';
import { changeIsOpenModuleWindow } from './store/imageModuleWindow';
import { requestImages } from './store/imageReducer';
import { RootState } from './store/store';

const App = () => {
    const dispatch = useDispatch()
    const images = useSelector((state: RootState) => state.images.images)
    const ModuleWindowIsOpen = useSelector((state: RootState) => state.imageModuleWindow.isOpen)
    const isLoading = useSelector((state: RootState) => state.images.isLoading)

    useEffect(() => {
        dispatch(requestImages())
    }, [])

    const openModalWindow = (image_id: number) => {
        dispatch(changeIsOpenModuleWindow(true, image_id))
    }

    return (
        <div className="App">
            {ModuleWindowIsOpen &&
                <ModuleWindow />
            }
            <h1>Test APP</h1>

            {isLoading 
                ? <div />
                
                : <div>
                    {images.map(image => 
                        <img key={image.image_id} src={image.src} alt="" onClick={() => openModalWindow(image.image_id)}/>    
                    )}
                </div>
            }

            <div>
                <span>© 2018-2019</span>
            </div>
        </div>
    );
}

export default memo(App);
