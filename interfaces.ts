// Définitions des types de l'endpoint qui retourne la liste des joueurs 
type Stats = {
    averageRating: number,
    totalGoals: number,
    totalStartedMatches: number,
    totalPlayedMatches: number,
    totalOwnGoals?: number,
    totalYellowCard?: number,
    totalRedCard?: number,
    totalMinutesPlayed?: number,
    totalCleanSheet?: number,
    totalGoalsConceded?: number,
    totalScoringAtt?: number,
    totalShotOffTarget?: number,
    totalBigChanceMissed?: number,
    totalPenaltiesScored?: number,
    totalPenalties?: number,
    totalCross?: number,
    totalAccurateCross?: number,
    totalContest?: number,
    totalWonContest?: number,
    totalWonDuel?: number,
    totalDuel?: number,
    totalTouches?: number,
    totalLostBall?: number,
    totalGoalAssist?: number,
    totalIntercept?: number,
    totalTackle?: number,
    totalMistake?: number,
    totalFouls?: number,
    totalBigChanceCreated?: number,
    totalAccuratePass?: number,
    totalPasses?: number,
    totalAccuratePassBackZone?: number,
    totalPassBackZone?: number,
    totalPassFwdZone?: number,
    totalAccuratePassFwdZone?: number,
    totalAccurateLongPass?: number,
    totalLongPass?: number,
    totalFouled?: number,
}

export interface Players {
    id: string;
    firstName: string;
    lastName: string;
    position: number;
    ultraposition: number;
    quotation: number;
    clubId: string;
    stats: Stats & {
        totalMatches: number, 
    };
}

// Définitions des types de l'endpoint qui retourne la liste des clubs

type ChampionshipsClub = {
    jerseys: { [key: string]: string };
    active:  boolean;
}

type NameClub = {
    "fr-FR": string;
    "en-GB": string;
    "es-ES": string;
}

export interface ClubsData {
    championshipClubs :  {[key: string]: {
            championships: {[key: string]: ChampionshipsClub}
            id: string;
            name: NameClub;
            shortName: string;
            defaultJerseyUrl: string;
            defaultAssets: null
        }
    }
}


// Définitions des types de l'endpoint qui retourne le détail d'un joueur 

type ClubDetails = {
    joinDate: Date,
    stats: null,
}

type MatchDetails = {
    playerClubId?: string,
    matchId: string,
    gameWeekNumber: number,
    date: Date,
    home: {
        clubId: string,
        score: number
    },
    away: {
        clubId: string,
        score: number
    },
    playerPerformance: {status: number}
}

type PercentRanksType = {
    quotation: number,
    averageRating: number,
    percentageCleanSheet: number,
    ratioGoalsConceded: number,
    ratioInterceptions: number,
    percentageStarter: number
}

type ChampionshipsPlayerDetails = {
    [key: string]: { 
        [key: string]: any,
        clubs: {[key: string]: MatchDetails},
        total: {
            matches: MatchDetails,
            quotations: {
                quotations: number,
                date: Date
            },
            stats: Stats
        },
        keySeasonStats: PercentRanksType,
        percentRanks: PercentRanksType,
        averagePercentRanks: PercentRanksType,
    };
}

export interface PlayersDetails {
    id: string;
    type: string;
    championships: ChampionshipsPlayerDetails;
    position: number;
    ultraposition: number
}