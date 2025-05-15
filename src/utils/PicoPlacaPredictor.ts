export class PicoPlacaPredictor {
    private static readonly RESTRICTED_DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ];
    private static readonly UNRESTRICTED_HOLIDAYS = [
        new Date("2025-01-01"), // New Year's Day
        new Date("2025-02-17"), // Carnival Monday
        new Date("2025-02-18"), // Carnival Tuesday
        new Date("2025-04-18"), // Good Friday
        new Date("2025-05-01"), // Labor Day
        new Date("2025-05-24"), // Battle of Pichincha
        new Date("2025-08-10"), // Independence Day
        new Date("2025-10-09"), // Independence of Guayaquil
        new Date("2025-11-02"), // All Souls' Day
        new Date("2025-11-03"), // Independence of Cuenca
        new Date("2025-12-06"), // Foundation of Quito
        new Date("2025-12-25"), // Christmas Day
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
        "Your car is not restricted.",
        "Your car IS restricted.",
    ];

    public static isRestricted(date: Date, licensePlate: string): boolean {
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
        const hour = date.getHours();
        const minute = date.getMinutes();
        const lastDigit = parseInt(licensePlate.slice(-1));

        const isHoliday = this.UNRESTRICTED_HOLIDAYS.some((holiday) =>
            this.isSameDate(date, holiday)
        );

        if (isHoliday) {
            console.log("Es un día feriado");
            return false;
        }

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
            date1.getDay() === date2.getDay() &&
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
