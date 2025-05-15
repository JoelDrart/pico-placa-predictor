import { useState } from "react";
import Result from "./components/ui/Result";
import { checkDateFormat, validateDate } from "./utils/checkInput";
import { PicoPlacaPredictor } from "./utils/PicoPlacaPredictor";

function App() {
    const [result, setResult] = useState("Waiting...");
    const [isRestricted, setIsRestricted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [licensePlate, setLicensePlate] = useState("");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };
    const handleLicensePlateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLicensePlate(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("Date:", date);
        console.log("Time:", time);
        console.log("License Plate:", licensePlate);

        const dateTime = PicoPlacaPredictor.convertStringToDate(date, time);
        const isRestricted = PicoPlacaPredictor.isRestricted(
            dateTime,
            licensePlate
        );

        setIsRestricted(isRestricted);
        const resultValue = PicoPlacaPredictor.getResult(isRestricted);
        setResult(resultValue);
        setShowResult(true);
    };
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-sky-600 text-white p-4">
                <h1 className="text-4xl text-center py-2">
                    Pico Placa Predictor
                </h1>
            </header>
            <main className="flex-grow mx-auto w-full max-w-2xl p-8 bg-slate-100 rounded-lg shadow-md m-4">
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                        Predict your Pico Placa restrictions
                    </h2>
                    <p className="text-center text-gray-600">
                        Enter the license plate number, date and time to check
                        if your car is restricted.
                    </p>
                </div>
                <form className="space-y-6 max-w-md mx-auto">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="plate"
                                className="text-lg font-medium text-gray-700 mb-2"
                            >
                                License Plate Number:
                            </label>
                            <input
                                type="text"
                                id="plate"
                                name="plate"
                                value={licensePlate}
                                onChange={handleLicensePlateChange}
                                required
                                placeholder="ABC-1234"
                                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            />
                            <label
                                htmlFor="date"
                                className="text-lg font-medium text-gray-700 mb-2"
                            >
                                Date:
                            </label>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                placeholder="DD/MM/YYYY"
                                value={date}
                                onChange={handleDateChange}
                                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="time"
                                className="text-lg font-medium text-gray-700 mb-2"
                            >
                                Time:
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={time}
                                onChange={handleTimeChange}
                                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-sky-600 text-white py-3 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200 font-medium"
                    >
                        Check Restrictions
                    </button>
                </form>

                <div className="mt-8">
                    {showResult && (
                        <Result result={result} isRestricted={isRestricted} />
                    )}
                </div>
            </main>
            <footer>
                <div className="bg-sky-600 text-white p-4">
                    <p className="text-center">
                        Pico Placa Predictor. Erick Malán. Stack Builders
                        Challenge
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
