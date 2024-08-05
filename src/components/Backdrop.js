import { motion } from "framer-motion"


const Backdrop = ({ children, closeModal }) => {
    const bdStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.288)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:100
    }

    return (
        <motion.div
            style={bdStyle}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default Backdrop;