    //player.js
    
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
            
            // Create and append the progress handle element
            const progressHandle = document.createElement('div');
            progressHandle.className = 'progress-handle';
            progressBar.appendChild(progressHandle);
            
            // Create volume slider components (initially hidden)
            const volumeContainer = document.createElement('div');
            volumeContainer.className = 'volume-container';
            volumeContainer.style.display = 'none'; // Initially hidden
            
            const volumeBar = document.createElement('div');
            volumeBar.className = 'volume-bar';
            
            const volumeLevel = document.createElement('div');
            volumeLevel.className = 'volume-level';
            
            const volumeHandle = document.createElement('div');
            volumeHandle.className = 'volume-handle';
            
            // Build volume control structure
            volumeLevel.appendChild(volumeHandle);
            volumeBar.appendChild(volumeLevel);
            volumeContainer.appendChild(volumeBar);
            
            // Add volume icon
            const volumeIcon = document.createElement('div');
            volumeIcon.className = 'volume-icon';
            const volumeImg = document.createElement('img');
            volumeImg.src = "icons/volume-max-svgrepo-com.svg";
            volumeImg.alt = "Volume";
            volumeIcon.appendChild(volumeImg);
            
            // Add volume components to the buttons container in the correct position
            const buttonsContainer = container.querySelector('.buttons-container');
            // Insert after forward button
            forwardBtn.insertAdjacentElement('afterend', volumeIcon);
            forwardBtn.insertAdjacentElement('afterend', volumeContainer);
            
            // Create fullscreen icon elements for toggling
            const fullscreenIcon = fullscreenBtn.querySelector('img');
            const fullscreenExitIcon = document.createElement('img');
            fullscreenExitIcon.src = "icons/fullscreen-exit-svgrepo-com.svg"; // You'll add this SVG
            fullscreenExitIcon.alt = "Exit Fullscreen";
            fullscreenExitIcon.style.display = 'none';
            fullscreenBtn.appendChild(fullscreenExitIcon);
            
            let hideControlsTimeout;
            
            // Fullscreen functionality - updated to target the container instead of just the video
            fullscreenBtn.addEventListener('click', () => {
                // Use the player container for fullscreen instead of just the video
                if (document.fullscreenElement) {
                    // Exit fullscreen if already in fullscreen mode
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    // Enter fullscreen mode
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.mozRequestFullScreen) { // Firefox
                        container.mozRequestFullScreen();
                    } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Opera
                        container.webkitRequestFullscreen();
                    } else if (container.msRequestFullscreen) { // IE/Edge
                        container.msRequestFullscreen();
                    }
                }
            });

            // Handle fullscreen change events to ensure controls remain visible
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.addEventListener('mozfullscreenchange', handleFullscreenChange);
            document.addEventListener('MSFullscreenChange', handleFullscreenChange);

            function handleFullscreenChange() {
                if (document.fullscreenElement === container || 
                    document.webkitFullscreenElement === container ||
                    document.mozFullScreenElement === container ||
                    document.msFullscreenElement === container) {
                    // Add fullscreen specific styling if needed
                    container.classList.add('in-fullscreen');
                    // Show controls briefly when entering fullscreen
                    controlsContainer.classList.add('active');
                    // Show volume controls in fullscreen
                    volumeContainer.style.display = 'block';
                    volumeIcon.style.display = 'block';
                    // Toggle fullscreen icons
                    fullscreenIcon.style.display = 'none';
                    fullscreenExitIcon.style.display = 'block';
                    startHideControlsTimer();
                } else {
                    // Remove fullscreen specific styling
                    container.classList.remove('in-fullscreen');
                    // Hide volume controls when not in fullscreen
                    volumeContainer.style.display = 'none';
                    volumeIcon.style.display = 'none';
                    // Toggle fullscreen icons
                    fullscreenIcon.style.display = 'block';
                    fullscreenExitIcon.style.display = 'none';
                }
            }

            // Volume bar interactions
            volumeBar.addEventListener('click', (e) => {
                const rect = volumeBar.getBoundingClientRect();
                const position = (e.clientX - rect.left) / rect.width;
                videoPlayer.volume = Math.max(0, Math.min(1, position));
                updateVolumeDisplay();
            });
            
            // Update volume display function
            function updateVolumeDisplay() {
                const volumePercent = videoPlayer.volume * 100;
                volumeLevel.style.width = volumePercent + '%';
            }
            
            // Update volume on video volume change
            videoPlayer.addEventListener('volumechange', updateVolumeDisplay);

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

            // REMOVED: Video click event listener that was toggling play/pause
            // Now the video itself won't play/pause when clicked
            
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
            
            // Volume icon click to mute/unmute
            volumeIcon.addEventListener('click', () => {
                videoPlayer.muted = !videoPlayer.muted;
                updateVolumeDisplay();
                // Update volume icon based on mute status
                if (videoPlayer.muted) {
                    volumeImg.src = "icons/volume-xmark-svgrepo-com.svg";
                } else {
                    volumeImg.src = "icons/volume-max-svgrepo-com.svg";
                }
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
            
            // Set initial volume display
            updateVolumeDisplay();
            
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