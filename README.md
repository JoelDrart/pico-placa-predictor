# Pico Placa Predictor

This app helps to predict if a car can circulate in Quito city based on the "Pico y Placa" traffic restriction system. The system restricts vehicle circulation based on the last digit of the license plate, time, and specific weekdays.

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pico-placa-predictor.git
```

2. Navigate to project directory:

```bash
cd pico-placa-predictor
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Usage

1. Enter your vehicle's license plate number (e.g., ABC-1234)
2. Enter a date (Format: DD/MM/YYYY)
3. Choose a time
4. Click "Check Restrictions"

The app will instantly inform you if your vehicle can circulate or is restricted.

**Note:** The system validates input formats and will display error messages if the license plate or date formats are incorrect.
