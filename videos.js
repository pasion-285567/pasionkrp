import { videosData } from './videosData.js';

function createVideoCard(video, index) {
    return `
    <div class="video-card" data-index="${index}">
        <div class="player-container">
            <div class="video-container">
                <video 
                    src="${video.src}" 
                    preload="metadata"
                    tabindex="0"
                    style="aspect-ratio:16/9; width:100%; border-radius:12px; background:#000;"
                ></video>
                <button class="main-play-button">
                    <div class="main-play-icon"><div class="play-icon"></div></div>
                    <div class="main-pause-icon"><div class="pause-icon"></div></div>
                </button>
                <div class="controls-container">
                    <div class="buttons-container">
                        <button class="control-button play-pause-btn">
                            <span class="play-icon"></span>
                            <span class="pause-icon" style="display:none;"></span>
                        </button>
                        <button class="control-button rewind-btn">
                            <img src="icons/gobackward-15-svgrepo-com.svg" alt="Rewind">
                        </button>
                        <button class="control-button forward-btn">
                            <img src="icons/goforward-15-svgrepo-com.svg" alt="Forward">
                        </button>
                        <span class="timestamp timestamp-progress">00:00</span>
                    <span class="timestamp time-slash">/</span>
                    <span class="timestamp timestamp-duration">00:00</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar"></div>
                    </div>
                    
                    <button class="control-button fullscreen-btn">
                            <img src="icons/fullscreen-svgrepo-com.svg" alt="Fullscreen">
                        </button>
                </div>
            </div>
        </div>
        <div class="album-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        </div>
    </div>
    `;
}

function renderVideos() {
    const videosGrid = document.querySelector('.videos-grid');
    if (!videosGrid) return;
    videosGrid.innerHTML = videosData.map(createVideoCard).join('');
    // Activate your player.js logic for all .player-container
    if (window.initCustomPlayers) window.initCustomPlayers();
}

document.addEventListener('DOMContentLoaded', renderVideos);