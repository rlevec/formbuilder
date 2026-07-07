import { memo } from "react"

export const ImageUploadField = () => {
    return (
        <div>IMAGE UPLOAD FIELD</div>
    )
}

const MemoizedImageUploadField = memo(ImageUploadField)

export default MemoizedImageUploadField