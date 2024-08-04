import { Grid } from 'react-loader-spinner'

const MvpVoteBeingSent = () => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={style}>
            <h2> Processing your vote</h2>
            <Grid
                visible={true}
                height="90"
                width="90"
                color="rgb(14, 118, 255)"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
            />
        </div>
    )
}

export default MvpVoteBeingSent;