interface ResultProps {
    result: string;
    isRestricted: boolean;
}

export default function Result({ result, isRestricted }: ResultProps) {
    return (
        <div
            className={`mb-8 p-6 rounded-lg shadow-md my-4 ${
                isRestricted
                    ? "bg-red-100 border-red-500 border-2"
                    : "bg-green-100 border-green-500 border-2"
            }`}
        >
            <h2
                className={`text-3xl font-semibold text-center ${
                    isRestricted ? "text-red-800" : "text-green-800"
                }`}
            >
                {result}
            </h2>
        </div>
    );
}
