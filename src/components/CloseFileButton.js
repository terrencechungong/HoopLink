import './styles/close-file.scss'
import { IoLocationOutline, IoCloseCircleSharp  } from "react-icons/io5";

const CloseFileButton = () => {
    return (
        <button style={{backgroundColor:'rgba(0,0,0,0)', borderWidth:'0px'}} className='close-file-button'>
            <IoCloseCircleSharp size={32} />
        </button>
    )
}

export default CloseFileButton;