export class PicoPlacaPredictor {
    private static readonly RESTRICTED_DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ];
    private static readonly UNRESTRICTED_HOLIDAYS = [
        new Date(2025, 0, 1), // New Year's Day
        new Date(2025, 1, 17), // Carnival Monday
        new Date(2025, 1, 18), // Carnival Tuesday
        new Date(2025, 3, 18), // Good Friday
        new Date(2025, 4, 1), // Labor Day
        new Date(2025, 4, 24), // Battle of Pichincha
        new Date(2025, 7, 10), // Independence Day
        new Date(2025, 9, 9), // Independence of Guayaquil
        new Date(2025, 10, 2), // All Souls' Day
        new Date(2025, 10, 3), // Independence of Cuenca
        new Date(2025, 11, 6), // Foundation of Quito
        new Date(2025, 11, 25), // Christmas Day
    ];
    private static readonly RESTRICTED_HOURS = [
        { startHour: 6, startMinute: 0, endHour: 9, endMinute: 30 },
        { startHour: 16, startMinute: 0, endHour: 20, endMinute: 0 },
    ];
    private static readonly RESTRICTED_ENDINGS = {
        Monday: [1, 2],
        Tuesday: [3, 4],
        Wednesday: [5, 6],
        Thursday: [7, 8],
        Friday: [9, 0],
    };
    private static readonly predictorMessage = [
        "Your car will not be restricted.",
        "Your car will be restricted.",
    ];

    public static isRestricted(date: Date, licensePlate: string): boolean {
        // Primero verificar si es feriado
        const isHoliday = this.UNRESTRICTED_HOLIDAYS.some((holiday) =>
            this.isSameDate(date, holiday)
        );

        if (isHoliday) {
            console.log("Es un día feriado");
            return false;
        }

        const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
        const hour = date.getHours();
        const minute = date.getMinutes();
        const lastDigit = parseInt(licensePlate.slice(-1));

        console.log(
            "Date:",
            date,
            "Time:",
            date.toLocaleTimeString(),
            "Day of Week:",
            dayOfWeek,
            "Hour:",
            hour,
            "Minute:",
            minute,
            "Last Digit of License Plate:",
            lastDigit
        );

        if (!this.RESTRICTED_DAYS.includes(dayOfWeek)) {
            return false;
        }

        for (const { startHour, startMinute, endHour, endMinute } of this
            .RESTRICTED_HOURS) {
            if (
                (hour > startHour ||
                    (hour === startHour && minute >= startMinute)) &&
                (hour < endHour || (hour === endHour && minute <= endMinute))
            ) {
                if (
                    this.RESTRICTED_ENDINGS[
                        dayOfWeek as keyof typeof this.RESTRICTED_ENDINGS
                    ].includes(lastDigit)
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    private static isSameDate(date1: Date, date2: Date): boolean {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    public static convertStringToDate(
        dateString: string,
        timeString: string
    ): Date {
        const [day, month, year] = dateString.split(/[/-]/).map(Number);
        const [hour, minute] = timeString.split(":").map(Number);

        const date = new Date(year, month - 1, day, hour, minute);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date or time");
        }

        return date;
    }

    public static getResult(isRestricted: boolean): string {
        console.log(
            "isRestricted",
            isRestricted,
            "result",
            this.predictorMessage[Number(isRestricted)]
        );
        return this.predictorMessage[Number(isRestricted)];
    }
}
