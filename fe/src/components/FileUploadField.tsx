import { memo } from "react"

export const FileUploadField = () => {
    return (
        <div>FILE UPLOAD FIELD</div>
    )
}

const MemoizedFileUploadField = memo(FileUploadField)

export default MemoizedFileUploadField