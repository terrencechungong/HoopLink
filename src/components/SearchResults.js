import { useState } from 'react';
import GlobalSideBar from './GlobalSideBar';
import './styles/search-results.scss'
import { useParams } from 'react-router-dom';
import ProfileSearchResultCard from './ProfileSearchResultCard';

const SearchResults = () => {
    const PEOPLE = 'PEOPLE';
    const LOCATIONS = 'LOCATIONS';
    const [selected, setSelected] = useState(PEOPLE);
    const { param } = useParams();

    let peopleRes = [<ProfileSearchResultCard/>];
    let locaRes = [];

    // dO ANIMATIONS LATER

    // MAE A PROFILE CARD AND RUN CARD FOR THIS
    return (
        <div id="search-results-screen">
            <GlobalSideBar />
            <div id="search-results-container">
                <h1>Search Results for "{param}"</h1>
                <div id="search-results-people-locations-toggler">
                    <p className={selected == PEOPLE ? 'selected' : ''}
                        onClick={() => setSelected(PEOPLE)}
                    >People{'  '} </p>
                    <p className={selected == LOCATIONS ? 'selected' : ''}
                        onClick={() => setSelected(LOCATIONS)}
                    >Run Locations</p>
                </div>
                <div id="person-search-results-container">
                {peopleRes}
                </div>
                
            </div>
        </div>
    )
}

export default SearchResults;