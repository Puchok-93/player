export const musicPlayerInit = () => {
     const audio = document.querySelector('.audio');
     const audioImg = document.querySelector('.audio-img');
     const audioHeader = document.querySelector('.audio-header');
     const audioPlayer = document.querySelector('.audio-player');
     const audioNavigation = document.querySelector('.audio-navigation');
     const audioButtonPlay = document.querySelector('.audio-button__play');
     const audioTimePassed = document.querySelector('.audio-time__passed');
     const audioProgress = document.querySelector('.audio-progress');
     const audioProgressTiming = document.querySelector('.audio-progress__timing');
     const audioTimeTotal = document.querySelector('.audio-time__total');

     const playList = ['hello', 'flow', 'speed'];
     let trackIndex = 0;

     const loadTrack = () => {
         const isPlayed = audioPlayer.paused;
         const track = playList[trackIndex];
         audioImg.src = `./audio/${track}.jpg`;
         audioHeader.textContent = track.toUpperCase();
         audioPlayer.src = `./audio/${track}.mp3`;

         if(isPlayed) {
             audioPlayer.pause();
         } else {
             audioPlayer.play();
         }
     }

     const playPrevTrack = () => {
        if(trackIndex !== 0) {
            trackIndex--;
         } else {
             trackIndex = playList.length - 1;
         }
         loadTrack();
     };

     const playNextTrack = () => {
        if(trackIndex === playList.length - 1) {
            trackIndex = 0;
         } else {
             trackIndex++;
         }
         loadTrack();
     };

     const addZero = n => n < 10 ? '0' + n : n;

     audioNavigation.addEventListener('click', e => {
         const target = e.target;

         if(target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
         }

         const track = playList[trackIndex];
         audioHeader.textContent = track.toUpperCase();

         if(target.classList.contains('audio-button__prev')) {
            playPrevTrack();
         }

         if(target.classList.contains('audio-button__next')) {
            playNextTrack();
         }
     });

     audioPlayer.addEventListener('ended', () => {
        playNextTrack();
        audioPlayer.play();
     });

     audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const durationAudio = audioPlayer.duration;
        const progress = (currentTime / durationAudio) * 100;

        audioProgressTiming.style.width = progress + '%';

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed  = Math.floor(currentTime % 60);

        let minutesDuration = Math.floor(durationAudio / 60);
        let secondsDuration = Math.floor(durationAudio % 60);

        // videoProgress.value = (currentTime / durationVideo) * 100;
        audioTimePassed.textContent = addZero(minutesPassed) + ':' + addZero(secondsPassed);
        audioTimeTotal.textContent = minutesDuration + ':' + secondsDuration;
    });

    audioProgress.addEventListener('click', e => {
        const x = e.offsetX;
        const widthTrack = audioProgress.clientWidth;
        const progress = (x / widthTrack) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });
};