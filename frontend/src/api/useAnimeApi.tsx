const useAnimeApi = () => {

    const getAnime = async (genreList: String[]) => {
        try {
            const response = await fetch('https://anime-roulette-backend.vercel.app//getRandomAnime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(genreList),
            });
   
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return {
        getAnime
    }
}

export default useAnimeApi;