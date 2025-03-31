* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

header {
    background-color: #007bff;
    color: white;
    padding: 20px;
    text-align: center;
}

main {
    padding: 20px;
}

section {
    margin-bottom: 40px;
}

#weather-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#city-input {
    padding: 10px;
    flex-grow: 1;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

#forecast {
    display: flex;
    justify-content: space-around;
}

.forecast-card {
    display: inline-block;
    margin: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    text-align: center;
}

#radar {
    text-align: center;
}

img[alt="Radar for Huntsville"] {
    width: 100%;
    max-width: 600px;
    border: 1px solid #ccc;
}

@media (max-width: 600px) {
    #forecast {
        flex-direction: column;
        align-items: center;
    }
}
