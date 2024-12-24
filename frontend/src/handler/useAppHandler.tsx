import { useEffect, useState } from "react";
import useAnimeApi from "../api/useAnimeAPI";
import { AnimeResponse } from "../type/AnimeResponse";


const useAppHandler = () => {
    const { getAnime } = useAnimeApi();
    const[ anime, setAnime ] = useState<AnimeResponse>();

    const fetchAnime = async () => {
        const response = await getAnime();
        if (response) setAnime(response);
    }

    return {
        anime,
        fetchAnime
    }
};

export default useAppHandler;