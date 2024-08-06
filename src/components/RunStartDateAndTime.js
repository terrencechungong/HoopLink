import { Calendar } from "@nextui-org/calendar";
import { parseDate } from '@internationalized/date';
import { today, getLocalTimeZone } from "@internationalized/date";
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './Backdrop';
import { duration } from '@mui/material';
import { TimeInput } from "@nextui-org/react";

export const StartDateCalendar = ({ handleClose, inputRef }) => {
    const dropIn = {
        hidden: {
            y: "+10px"
        },
        visible: {
            y: "0",
            transition: {
                duration: 0.2,
            }
        },
        exit: {
            y: "+10px"
        }
    }

    const formatBeforeParse = (date) => {
        const dateObj = new Date(`${date.year}-${date.month}-${date.day}`);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    return (
        <Backdrop closeModal={(e) => {
            e.stopPropagation();
            handleClose();
        }}>
            <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}>
                <Calendar
                    onFocusChange={(date) => { inputRef.current.innerText = (formatBeforeParse(date)) }}
                    defaultValue={today(getLocalTimeZone())}
                    minValue={today(getLocalTimeZone())}
                />
            </motion.div>
        </Backdrop>
    )
}

export const TimeComponent = ({ handleClose, inputRef }) => {
    const dropIn = {
        hidden: {
            y: "+10px"
        },
        visible: {
            y: "0",
            transition: {
                duration: 0.2,
            }
        },
        exit: {
            y: "+10px"
        }
    }

    const formatBeforeParse = (time) => {
        const ampm = time.hour >= 12 ? 'PM' : 'AM';
        let hours = time.hour % 12;
        hours = hours ? hours : 12; 
        let minutes = time.minute < 10 ? '0' + String(time.minute) : String(time.minute);
        let formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    return (
        <Backdrop closeModal={(e) => {
            e.stopPropagation();
            handleClose();
        }}>
            <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}>
                <TimeInput
                    onChange={(value) => inputRef.current.innerText = formatBeforeParse(value)}
                    isRequired
                    label="Event Time"
                />
            </motion.div>
        </Backdrop>
    )
}