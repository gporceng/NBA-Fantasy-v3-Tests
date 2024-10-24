import fetch from 'node-fetch';

const apiUrl = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/2025/segments/0/leagues/1136889313/?view=mMatchup';

(async () => {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP ERROR: Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Initialize an object to store the scores by week and teamId
        const teamStats = {};

        // Iterate over the schedule to extract all matchup periods
        data.schedule.forEach(matchup => {
            const { matchupPeriodId, away, home } = matchup;

            // If the matchup period doesn't exist in the object, initialize it
            if (!teamStats[matchupPeriodId]) {
                teamStats[matchupPeriodId] = {};
            }

            // Store the cumulative scores for both away and home teams
            teamStats[matchupPeriodId][away.teamId] = away.cumulativeScore;
            teamStats[matchupPeriodId][home.teamId] = home.cumulativeScore;
        });

        console.log('All Team Stats by Week:', teamStats[1][1].scoreByStat[0].score);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
