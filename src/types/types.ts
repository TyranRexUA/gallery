export interface imageType {
    image_id: number
    src: string
}

export interface imageSrcType {
    src: string
}
export interface commentType {

    description: string
    name: string
    id: number
    image_id: number

}

export interface addCommentType {
    name: string
    description: string
    image_id: number
}