document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    const playerContainer = document.getElementById('music-player-container');
    const musicIcon = document.getElementById('music-icon');
    const playPauseIcon = document.getElementById('play-pause-icon');

    let hasInteracted = false; // Flag untuk melacak interaksi pengguna

    // Fungsi untuk mencoba memutar musik
    function tryPlayMusic() {
        music.play().then(() => {
            // Berhasil putar
            musicIcon.classList.remove('pause-state');
            musicIcon.classList.add('play-state');
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
            console.log("Musik diputar otomatis.");
        }).catch(error => {
            // Gagal putar (kemungkinan diblokir browser)
            musicIcon.classList.remove('play-state');
            musicIcon.classList.add('pause-state');
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            console.log("Autoplay diblokir, menunggu interaksi pengguna.");
        });
    }

    // Coba putar musik saat halaman dimuat (untuk autoplay)
    tryPlayMusic();

    // Event listener untuk interaksi pengguna pertama di halaman
    document.body.addEventListener('click', function() {
        if (!hasInteracted) {
            tryPlayMusic(); // Coba putar lagi setelah interaksi pertama
            hasInteracted = true;
        }
    }, { once: true }); // Hanya jalankan sekali

    // Toggle play/pause saat ikon diklik
    playerContainer.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicIcon.classList.remove('pause-state');
            musicIcon.classList.add('play-state');
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else {
            music.pause();
            musicIcon.classList.remove('play-state');
            musicIcon.classList.add('pause-state');
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });

    // Perbarui ikon saat musik berhenti (misalnya, jika di-pause dari kontrol browser)
    music.addEventListener('pause', () => {
        musicIcon.classList.remove('play-state');
        musicIcon.classList.add('pause-state');
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    });

    music.addEventListener('play', () => {
        musicIcon.classList.remove('pause-state');
        musicIcon.classList.add('play-state');
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    });
});
