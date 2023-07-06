import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    try {
        res.json({
            weight,
            height,
            bmi: calculateBmi(Number(weight), Number(height))
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises: number[] = req.body.daily_exercises as number[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target as number;
    try {
        const dailyHours = daily_exercises.map((i: number) => Number(i));
        const result = calculateExercises({
            dailyHours,
            targetAvg: Number(target)
        });
        res.json(result).send();
    } catch (err) {
        console.log(err);
        res.json({
            "error": "malformed parameters"
        }).send(400);

    }
});


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});