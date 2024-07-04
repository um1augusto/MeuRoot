const Audio = document.getElementById("audio");
const InputRange = document.getElementById("input-range");

volumeSlider.addEventListener("input", () => { Audio.volume = InputRange.value;})