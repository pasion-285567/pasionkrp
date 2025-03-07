const API_KEY = 'AIzaSyBVBowhuNQgc7DbdCnuAiYC_a7D0LpyCD8';
const CHANNEL_ID = 'UCHZ-pxYUfMbVg8gCAIPCneA';

async function fetchLiveStream() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            embedVideo(videoId);
        } else {
            document.getElementById('video-container').innerHTML = '<p style="padding:20px;">Live stream is currently offline.</p>';
        }
    } catch (error) {
        console.error('Error fetching live stream:', error);
        document.getElementById('video-container').innerHTML = '<p style="padding:20px;">Error loading live stream.</p>';
    }
}

function embedVideo(videoId) {
    const embedHtml = `
       <iframe class="yt-live"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
         <iframe class="yt-live" src="https://www.youtube.com/embed/8-cjb9kbthE"
            frameborder="0" allowfullscreen>
        </iframe>
    `;
    document.getElementById('video-container').innerHTML = embedHtml;
}


fetchLiveStream();