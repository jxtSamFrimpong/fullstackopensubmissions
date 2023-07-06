interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
interface Args {
    targetAvg: number,
    dailyHours: number[]
}

export function calculateExercises(Args: Args): Result {
    const { dailyHours, targetAvg } = Args;
    const avg_daily_hours = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
    let rating, ratingDescription;
    if (avg_daily_hours > targetAvg) {
        rating = 5;
        ratingDescription = 'oh my god';
    }
    if (avg_daily_hours === targetAvg) {
        rating = 4;
        ratingDescription = 'excellent';
    }
    if (avg_daily_hours < 0.5 * targetAvg) {
        rating = 1;
        ratingDescription = 'POOR, do better';
    }
    else if (avg_daily_hours < 0.8 * targetAvg) {
        rating = 2;
        ratingDescription = 'keep it up, youll get there';
    }
    else if (avg_daily_hours < targetAvg) {
        rating = 3;
        ratingDescription = 'well done and keep it up';
    }
    else {
        rating = 0;
        ratingDescription = "unknown";
    }

    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(i => i !== 0).length,
        success: avg_daily_hours > targetAvg,
        rating,
        ratingDescription,
        target: targetAvg,
        average: avg_daily_hours
    };

}

export function getArgs(): Args {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_command, _file, targetAvg, ...dailies] = process.argv;
    //console.log(targetAvg, dailies)
    return {
        targetAvg: Number(targetAvg) ? Number(targetAvg) : 0,
        dailyHours: dailies.map(i => {
            if (isNaN(Number(i))) {
                return 0;
            }
            return Number(i);
        })
    };
}

// console.log(calculateExercises(getArgs()));