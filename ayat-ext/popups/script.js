let ayatInfo, ayatReload, ayatAR, ayatBN, ayatControl

ayatInfo = document.querySelector('.ayat__info')
ayatReload = document.querySelector('.ayat__reload')
ayatAR = document.querySelector('.ayat__ar')
ayatBN = document.querySelector('.ayat__bn')
ayatAudio = document.querySelector('.ayat__audio')
ayatControl = document.querySelector('.ayat__control')

// functions
const getRandomNumber = (min, max) => Math.random() * (max - min) + min
const loadAyat = ( n = getRandomNumber(1, 6232) ) => {
    fetch(`http://api.alquran.cloud/v1/ayah/${n}/editions/quran-uthmani,ar.alafasy,bn.bengali`)
    .then( res => res.json() )
    .then(res => {
        if(res.data) {
            let AR = res.data[0], AUDIO = res.data[1], BN = res.data[2]
            ayatInfo.innerHTML = `${AR.surah.englishName} <span>(${AR.surah.number}:${AR.numberInSurah })</span>`
            ayatAR.innerHTML = AR.text
            ayatBN.innerHTML = BN.text
            ayatAudio.src = AUDIO.audio
        }
    }) 
    .catch(error => console.error('Error:', error));
}

// Events
ayatControl.addEventListener('click', () => {
    ayatControl.toggleAttribute('play')
    ayatControl.hasAttribute('play') ? ayatControl.innerHTML = '<i class="gg-play-pause"></i>' : ayatControl.innerHTML = '<i class="gg-play-button"></i>'
    ayatAudio.paused ? ayatAudio.play() : ayatAudio.pause();
})
ayatReload.addEventListener('click', () => loadAyat())
// Audio Play or Pause ? Check every 0.5 sec
setInterval(() => {
    ayatAudio.paused ? ayatControl.innerHTML = '<i class="gg-play-button"></i>' : ayatControl.innerHTML = '<i class="gg-play-pause"></i>'
    ayatAudio.paused ? ayatControl.classList.remove('active') : ayatControl.classList.add('active');
}, 500)

// Init Ayat
loadAyat()