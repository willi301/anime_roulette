import { useState } from "react";
import useAnimeApi from "../api/useAnimeApi";
import { AnimeResponse } from "../type/AnimeResponse";

const useAppHandler = () => {
    const { getAnime } = useAnimeApi();
    const[ anime, setAnime ] = useState<AnimeResponse>();
    const [ isLoading, setIsLoading ] = useState<Boolean>();

    const fetchAnime = async (genreList: String[]) => {
        setIsLoading(true);
        const response = await getAnime(genreList);
        if (response) setAnime(response);
        setIsLoading(false);
        console.log("anime", response);
    }

    return {
        anime,
        fetchAnime,
        isLoading
    }
};

export default useAppHandler;