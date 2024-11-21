import fetch from 'node-fetch';

const apiUrl = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/1136889313/?view=mBoxscore';

(async () => {
    try {
        const response = await fetch(apiUrl);

        if(!response.ok) {
            throw new Error('HTTP ERROR: Status: ${response.status}');
        }

        const data = await response.json();

        console.log(data.status.currentMatchupPeriod); //2025 NBA Fantasy
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();