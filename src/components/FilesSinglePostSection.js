import { useEffect } from "react";


const FilesSinglePostSection = ({ filesThumbnails, showModal }) => {

    useEffect(() => {
        const classNames = ['one-photo', 'half-photos', 'top-third-fourth', 'bottom-third', 'bottom-fourth'];
        const selector = classNames.map(className => `div.${className}`).join(', ');
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.onclick = showModal;
            element.style.cursor = 'pointer'; 
        });
    })

    const bgStyles = {
        backgroundSize: 'cover', // This makes the background image cover the entire div
        backgroundPosition: 'center', // This centers the background image in the div
        height: '100%', // Example height, adjust as needed
        width: '100%'
    }
    
    if (filesThumbnails.length == 0) {
        return null;
    }
    if (filesThumbnails.length == 1) {
        return (
            <div className='single-post-files-section'>
                <div className="one-photo" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[0]})` }}>
                </div>
            </div>
        )
    }
    if (filesThumbnails.length == 2) {
        return (
            <div className='single-post-files-section'>
                <div className="half-photos" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[0]})` }}>
                </div>
                <div className="half-photos" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[1]})` }}>
                </div>
            </div>
        )
    }
    if (filesThumbnails.length == 3) {
        return (
            <div className='single-post-files-section'>
                <div className="top-third-fourth" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[0]})` }}>
                </div>
                <div className="bottom-third" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[1]})` }}>
                </div>
                <div className="bottom-third" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[2]})` }}>
                </div>
            </div>
        )
    }
    if (filesThumbnails.length > 3) {
        return (
            <div className='single-post-files-section'>
                <div className="top-third-fourth" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[0]})` }}>
                </div>
                <div className="bottom-fourth" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[1]})` }}>
                </div>
                <div className="bottom-fourth" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[2]})` }}>
                </div>
                <div className="bottom-fourth" style={{ ...bgStyles, backgroundImage: `url(${filesThumbnails[3]})` }}>
                    {filesThumbnails.length > 4 && <div className="over-four-cover"><p>+ {filesThumbnails.length - 4}</p></div>}
                </div>
            </div>
        )
    }
}

export default FilesSinglePostSection;