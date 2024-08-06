import Backdrop from "./Backdrop";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./Searchicon";
import './styles/search-results.scss'
import { motion } from 'framer-motion'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBarModal = ({ handleClose }) => {
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const dropIn = {
        hidden: {
            y: "-100px"
        },
        visible: {
            y: "0",
            transition: {
                duration: 0.3,
            }
        },
        exit: {
            y: "-100px"
        }
    }

    function waitForTwoSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    const handleKeyDown = async (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        if (searchInputRef.current && searchInputRef.current.value !== "") {
            console.log(searchInputRef.current.value);
            handleClose();
            // make util class for stuff like waiters
            await waitForTwoSeconds();
            navigate(`/searchresults/${searchInputRef.current.value}`);
        }
    }

    return (
        <Backdrop closeModal={handleClose}>
            <motion.div
                variants={dropIn}
                id="searchbar"
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <p>Search</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <SearchIcon />
                    <input type='text'
                    placeholder="Search for people or places..."
                    ref={searchInputRef}
                    onKeyDown={handleKeyDown}
                    />
                </div>
            </motion.div>

        </Backdrop>
    )
}

export default SearchBarModal;