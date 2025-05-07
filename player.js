document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const mainPlayButton = document.getElementById('mainPlayButton');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const controlsContainer = document.getElementById('controlsContainer');
    const timestamp = document.getElementById('timestamp');
    
    let hideControlsTimeout;
    
    // Main play button click
    mainPlayButton.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('click', togglePlay);
    
    // Controls play/pause button
    playPauseBtn.addEventListener('click', togglePlay);
    
    // Rewind and forward buttons
    rewindBtn.addEventListener('click', () => {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 15);
    });
    
    forwardBtn.addEventListener('click', () => {
        videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 15);
    });
    
    // Progress bar interactions
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        videoPlayer.currentTime = position * videoPlayer.duration;
    });
    
    // Video events
    videoPlayer.addEventListener('play', () => {
        updatePlayPauseIcons(true);
        mainPlayButton.classList.add('hidden');
        controlsContainer.classList.add('active');
        startHideControlsTimer();
    });
    
    videoPlayer.addEventListener('pause', () => {
        updatePlayPauseIcons(false);
        mainPlayButton.classList.remove('hidden');
        controlsContainer.classList.add('active');
        clearTimeout(hideControlsTimeout);
    });
    
    videoPlayer.addEventListener('timeupdate', updateProgress);
    
    // Mouse movement to show controls
    document.querySelector('.player-container').addEventListener('mousemove', () => {
        controlsContainer.classList.add('active');
        startHideControlsTimer();
    });
    
    // Hover on controls should keep them visible
    controlsContainer.addEventListener('mouseenter', () => {
        clearTimeout(hideControlsTimeout);
    });
    
    controlsContainer.addEventListener('mouseleave', () => {
        if (!videoPlayer.paused) {
            startHideControlsTimer();
        }
    });
    
    // Toggle play/pause function
    function togglePlay() {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.style.width = percentage + '%';
        
        // Update timestamp
        const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
        const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
        const durationMinutes = Math.floor(videoPlayer.duration / 60) || 0;
        const durationSeconds = Math.floor(videoPlayer.duration % 60) || 0;
        
        timestampProgress.textContent = `${padZero(currentMinutes)}:${padZero(currentSeconds)}`;
        timestampDuration.textContent = `${padZero(durationMinutes)}:${padZero(durationSeconds)}`;
    }
    
    // Helper for formatting time
    function padZero(num) {
        return (num < 10) ? '0' + num : num;
    }
    
    // Start timer to hide controls
    function startHideControlsTimer() {
        clearTimeout(hideControlsTimeout);
        if (!videoPlayer.paused) {
            hideControlsTimeout = setTimeout(() => {
                controlsContainer.classList.remove('active');
            }, 3000);
        }
    }
    
    // Update play/pause icons
    function updatePlayPauseIcons(isPlaying) {
        const mainPlayIcon = document.querySelector('.main-play-icon');
        const mainPauseIcon = document.querySelector('.main-pause-icon');
        const controlPlayIcon = playPauseBtn.querySelector('.play-icon');
        const controlPauseIcon = playPauseBtn.querySelector('.pause-icon');
        
        if (isPlaying) {
            mainPlayIcon.style.display = 'none';
            mainPauseIcon.style.display = 'flex';
            controlPlayIcon.style.display = 'none';
            controlPauseIcon.style.display = 'block';
        } else {
            mainPlayIcon.style.display = 'flex';
            mainPauseIcon.style.display = 'none';
            controlPlayIcon.style.display = 'block';
            controlPauseIcon.style.display = 'none';
        }
    }
    
    // Load video placeholder
    videoPlayer.load();
});