import './styles/close-file.scss'
import { IoLocationOutline, IoCloseCircleSharp  } from "react-icons/io5";

const CloseFileButton = ({divId, removeFunction}) => {
    return (
        <button className='close-file-button' onClick={async () => await removeFunction(divId)}>
            <IoCloseCircleSharp size={32} />
        </button>
    )
}

export default CloseFileButton;