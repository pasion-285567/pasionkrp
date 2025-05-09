document.addEventListener('DOMContentLoaded', function () {
    const mediaContainer = document.querySelector('.media-container');
    const videos = [
        { src: '/Media/Solo_AngDiosAyLapitan.mp4' },
        { src: '/Media/Solo_Sana\'yDingginAngAwit.mp4' },
        { src: '/Media/Solo_KungNaisMo\'yMagandangBuhay.mp4' },
        { src: '/Media/Solo_OhDiosSalamatSaKabutihanMo.mp4' },
    ];

    videos.forEach(video => {
        const playerHTML = `
            <div class="player-container">
                <div class="video-container">
                    <video>
                        <source src="${video.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="main-play-button">
                        <div class="main-play-icon"><div class="play-icon"></div></div>
                        <div class="main-pause-icon"><div class="pause-icon"></div></div>
                    </div>
                </div>
                <div class="controls-wrapper">
                    <div class="controls-container">
                        <div class="controls-placeholder">
                            <div class="buttons-container">

                                <!-- Play/pause button -->
                                <button class="control-button play-pause-btn">
                                    <div class="play-icon"></div>
                                    <div class="pause-icon"></div>
                                </button>
                                <!-- Rewind button -->
                                <button class="control-button rewind-btn">
                                    <img src="icons/gobackward-15-svgrepo-com.svg" alt="Go Backward">
                                </button>
                                <!-- Forward button -->
                                <button class="control-button forward-btn">
                                    <img src="icons/goforward-15-svgrepo-com.svg" alt="Go Forward">
                                </button>
                                
                                <!-- Volume icon and control will be added by JavaScript -->
                                
                                <!-- Timestamps -->
                                <div class="timestamp" id="timestampProgress">00:00</div>
                                <div class="timestamp" id="timeSlash">/</div>
                                <div class="timestamp" id="timestampDuration">00:00</div>
                            </div>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar"></div>
                        </div>
                        <!-- Fullscreen button -->
                                <button class="control-button fullscreen-btn">
                                    <img src="icons/fullscreen-svgrepo-com.svg" alt="Fullscreen">
                                </button>
                    </div>
                </div>
            </div>
        `;
        mediaContainer.insertAdjacentHTML('beforeend', playerHTML);
    });
});