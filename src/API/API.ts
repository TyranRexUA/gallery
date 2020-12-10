import axios from 'axios';
import { commentType, imageSrcType, imageType } from '../types/types';

const instance = axios.create({
    baseURL: 'https://tzfrontend.herokuapp.com/',
})

const API = {
    getImages() { // get all images
        return instance.get<imageType[]>('images/').then(response => response.data)
    },

    getImage(image_id: number) { // get 1 image
        return axios.get<imageSrcType>(`images/${image_id}/`).then(response => response.data)
    },

    getComments(image_id: number) {
        return instance.get<commentType[]>(`comments/${image_id}/`).then(response => response.data)
    },

    addComment(image_id: number, name: string, description: string) {
        return axios.post('comments/add/', {name, description, image_id}).then(response => response.data.name)
    }
}

export default API;