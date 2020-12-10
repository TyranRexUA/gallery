import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { requestImages } from './store/imageReducer';
import { RootState } from './store/store';

const App = () => {
    const dispatch = useDispatch()
    let images = useSelector((state: RootState) => state.images.images)

    useEffect(() => {
        dispatch(requestImages())
    }, [])

    return (
        <div className="App">
            <h1>Test APP</h1>

            <div>
            {images.map(image => 
                <img src={image.src} alt=""/>    
            )}
            </div>

            <div>
                <span>© 2018-2019</span>
            </div>
        </div>
    );
}

export default App;
