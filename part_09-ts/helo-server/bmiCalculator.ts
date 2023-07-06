export function calculateBmi(weight: number, height: number): string {
    if (height === 0) {
        throw new Error('cannot divide by zero');
    }
    const bmi = (weight / ((height / 100) ** 2));
    console.log(bmi);

    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    }
    if (bmi > 16.0 && bmi < 17.0) {
        return "Underweight (Moderate thinness)";
    }
    if (bmi >= 17.0 && bmi < 18.5) {
        return "Underweight (Mild thinness)";
    }
    if (bmi >= 18.5 && bmi < 25.0) {
        return "Normal range";
    }
    if (bmi >= 25.0 && bmi < 30.0) {
        return "Overweight (Pre-obese)";
    }
    if (bmi >= 30.0 && bmi < 35.0) {
        return "Obese (Class I)";
    }
    if (bmi >= 35.0 && bmi < 39.9) {
        return "Obese (Class II)";
    }
    if (bmi >= 39.9) {
        return "Obese (Class III)";
    }
    return "";
}

// try {
//     console.log(calculateBmi(80, 174))
// } catch (err: unknown) {
//     let errorMessage = 'Something went wrong: '
//     if (err instanceof Error) {
//         errorMessage += err.message;
//     }
//     console.log(errorMessage);
// }