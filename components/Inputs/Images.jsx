import { uploadImage } from '@/utils/lib/appwrite'

export const addProductImage = async (images) => {
    try {
        if (!images) {
            return;
        }
        let imageArray = [];
        const array = images ? Array.from(images) : []
        for (let i = 0; i < array.length; i++) {
            const fileUploaded = await uploadImage(array[i])
            if (!fileUploaded) return;
            imageArray.push(fileUploaded.$id)
        }
        return imageArray
    } catch (error) {
        return error.message
    }
}