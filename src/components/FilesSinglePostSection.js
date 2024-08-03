

const FilesSinglePostSection = ({ filesThumbnails }) => {
    if (filesThumbnails.length == 0) {
        return null;
    }
    if (filesThumbnails.length == 1) {
        return (
            <div className='single-post-files-section'>
                <div className="one-photo">
                    <img src={filesThumbnails[0]} />
                </div>
            </div>
        )
    }
    if (filesThumbnails.length == 2) {
        return (
            <div className='single-post-files-section'>
                <div className="half-photos">
                    <img src={filesThumbnails[0]} />
                </div>
                <div className="half-photos">
                    <img src={filesThumbnails[1]} />
                </div>
            </div>
        )
    }
    if (filesThumbnails.length == 3) {
        return (
            <div className='single-post-files-section'>
                <div className="top-third-fourth">
                    <img src={filesThumbnails[0]} />
                </div>
                <div className="bottom-third">
                    <img src={filesThumbnails[1]} />
                </div>
                <div className="bottom-third">
                    <img src={filesThumbnails[2]} />
                </div>
            </div>
        )
    }
    if (filesThumbnails.length > 3) {
        return (
            <div className='single-post-files-section'>
            <div className="top-third-fourth">
                <img src={filesThumbnails[0]} />
            </div>
            <div className="bottom-fourth">
                <img src={filesThumbnails[1]} />
            </div>
            <div className="bottom-fourth">
                <img src={filesThumbnails[2]} />
            </div>
            <div className="bottom-fourth">
                {filesThumbnails.length > 4 && <div className="over-four-cover"></div>}
                <img src={filesThumbnails[2]} />
            </div>
        </div>
        )
    }
}

export default FilesSinglePostSection;