document.addEventListener('DOMContentLoaded', function() {
    const playerContainers = document.querySelectorAll('.player-container');

    playerContainers.forEach(container => {
        const videoPlayer = container.querySelector('video');
        const mainPlayButton = container.querySelector('.main-play-button');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const rewindBtn = container.querySelector('.rewind-btn');
        const forwardBtn = container.querySelector('.forward-btn');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        const progressBar = container.querySelector('.progress-bar');
        const progressContainer = container.querySelector('.progress-container');
        const controlsContainer = container.querySelector('.controls-container');
        const timestampProgress = container.querySelector('#timestampProgress');
        const timestampDuration = container.querySelector('#timestampDuration');
        
        let hideControlsTimeout;
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', () => {
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen();
            } else if (videoPlayer.mozRequestFullScreen) { // Firefox
                videoPlayer.mozRequestFullScreen();
            } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
                videoPlayer.msRequestFullscreen();
            }
        });

        // Pause all other videos before playing the new one
        function pauseOtherVideos() {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach(v => {
                if (v !== videoPlayer && !v.paused) {
                    v.pause();
                }
            });
        }

        // Main play button click
        mainPlayButton.addEventListener('click', function() {
            pauseOtherVideos();
            togglePlay();
        });

        videoPlayer.addEventListener('click', function() {
            pauseOtherVideos();
            togglePlay();
        });
        
        // Controls play/pause button
        playPauseBtn.addEventListener('click', function() {
            pauseOtherVideos();
            togglePlay();
        });
        
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
        container.addEventListener('mousemove', () => {
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
            const mainPlayIcon = container.querySelector('.main-play-icon');
            const mainPauseIcon = container.querySelector('.main-pause-icon');
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
    });
});
