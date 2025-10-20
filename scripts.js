        import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
        import { getFirestore, collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';


        const firebaseConfig = {
            apiKey: "AIzaSyAMWLEC6YcTnx53CXZReR7E67-SIJCzBwI",
            authDomain: "bro-raymund.firebaseapp.com",
            databaseURL: "https://bro-raymund-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "bro-raymund",
            storageBucket: "bro-raymund.firebasestorage.app",
            messagingSenderId: "415894158344",
            appId: "1:415894158344:web:20c3298dce4c4235b5e5bd",
            measurementId: "G-9YCPZ7BJSH"
        };


        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);


        window.db = db;
        window.firestore = { collection, getDocs, orderBy, query };
        console.log('Firebase initialized successfully');


        setTimeout(async () => {
            await loadAllContent();
        }, 100);


        document.addEventListener('DOMContentLoaded', async function () {

            if (!window.db || !window.firestore) {
                setTimeout(async () => {
                    await loadAllContent();
                }, 300);
            }
        });

        async function loadAllContent() {
            try {
                await Promise.all([
                    loadProfile(),
                    loadAlbums(),
                    loadPersonalPhotos(),
                    loadNotes()
                ]);
            } catch (error) {
                console.error('Error loading content:', error);
                showError('Failed to load content. Please refresh the page.');
            }
        }

        async function loadProfile() {
            try {
                const querySnapshot = await window.firestore.getDocs(window.firestore.collection(window.db, 'profile'));
                if (!querySnapshot.empty) {
                    const profileData = querySnapshot.docs[0].data();


                    const coverPhoto = document.getElementById('cover-photo');
                    if (profileData.coverPhoto) {
                        coverPhoto.src = profileData.coverPhoto;
                    } else {
                        coverPhoto.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop';
                    }


                    const profilePhoto = document.getElementById('profile-photo');
                    if (profileData.profilePhoto) {
                        profilePhoto.src = profileData.profilePhoto;
                    } else {
                        profilePhoto.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
                    }


                    document.getElementById('bio-title').textContent = profileData.bioTitle || 'The Melodic Synthesist';
                    document.getElementById('bio-content').innerHTML = profileData.bioContent || `I'm <strong>Kurt Raymund Pasion</strong> — a developer by discipline, a musician at heart. I live between logic and lyric, shifting from code to chord, from syntax to song.`;
                } else {

                    document.getElementById('cover-photo').src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop';
                    document.getElementById('profile-photo').src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
                }


                document.getElementById('about-loading').style.display = 'none';
                document.getElementById('about-content').style.display = 'block';
            } catch (error) {
                console.error('Error loading profile:', error);
                document.getElementById('about-loading').innerHTML = '<div class="error-message">Failed to load profile information.</div>';
            }
        }

        async function loadAlbums() {
            try {
                const querySnapshot = await window.firestore.getDocs(window.firestore.collection(window.db, 'albums'));
                const albumsGrid = document.getElementById('albums-grid');
                if (querySnapshot.empty) {
                    albumsGrid.innerHTML = '<div class="error-message">No albums found. Create some albums in the admin panel!</div>';
                } else {
                    albumsGrid.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const album = doc.data();
                        const albumElement = createAlbumElement(album);
                        albumsGrid.appendChild(albumElement);
                    });
                }
                document.getElementById('albums-loading').style.display = 'none';
            } catch (error) {
                console.error('Error loading albums:', error);
                document.getElementById('albums-loading').innerHTML = '<div class="error-message">Failed to load albums.</div>';
            }
        }


        function createAlbumElement(album) {
            const albumDiv = document.createElement('div');
            albumDiv.className = 'album-card';
            albumDiv.onclick = () => openExpandedAlbum(album.title, album.photos);


            let coverHtml = '';
            if (album.photos && album.photos.length > 0) {
                const displayPhotos = album.photos.slice(0, 3);
                coverHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; height: 100%; gap: 2px;">
                ${displayPhotos.map(photo =>
                    `<img src="${photo}" alt="${album.title}" style="width: 100%; height: 100%; object-fit: cover;">`
                ).join('')}
                ${displayPhotos.length < 3 ?
                        '<div style="background: #e2e8f0; display: flex; align-items: center; justify-content: center; color: #a0aec0; font-size: 1.5rem;">📷</div>'.repeat(3 - displayPhotos.length)
                        : ''
                    }
            </div>
        `;
            }

            albumDiv.innerHTML = `
        <div class="album-cover">
            ${coverHtml}
            <div class="album-overlay">
                <h3>${album.title}</h3>
                <p>${album.photos.length} Photos</p>
            </div>
        </div>
    `;

            return albumDiv;
        }

        function openExpandedAlbum(title, photos) {

            const albumsGrid = document.getElementById('albums-grid');
            albumsGrid.classList.add('expanded');


            let expandedView = document.getElementById('album-expanded-view');
            if (!expandedView) {
                expandedView = document.createElement('div');
                expandedView.id = 'album-expanded-view';
                expandedView.className = 'album-expanded';
                albumsGrid.parentNode.appendChild(expandedView);
            }


            expandedView.innerHTML = `
        <div class="album-header">
            <h2 class="album-title">${title}</h2>
            <button class="back-button" onclick="closeExpandedAlbum()">
                ← Back to Albums
            </button>
        </div>
        <div class="album-photos-grid" id="expanded-photos-grid">
            ${photos.map(photo => `
                <div class="album-photo-item" onclick="openMediaModal('${photo}')">
                    <img src="${photo}" alt="${title}" loading="lazy">
                </div>
            `).join('')}
        </div>
    `;


            expandedView.classList.add('show');


            document.getElementById('albums').scrollIntoView({ behavior: 'smooth' });
        }



        function closeExpandedAlbum() {
            const albumsGrid = document.getElementById('albums-grid');
            const expandedView = document.getElementById('album-expanded-view');

            if (expandedView) {
                expandedView.classList.remove('show');
                setTimeout(() => {
                    expandedView.remove(); // Completely remove the element
                }, 300);
            }


            albumsGrid.classList.remove('expanded');
        }


        window.openExpandedAlbum = openExpandedAlbum;
        window.closeExpandedAlbum = closeExpandedAlbum;


        async function loadPersonalPhotos() {
            try {
                const querySnapshot = await window.firestore.getDocs(window.firestore.collection(window.db, 'personalPhotos'));
                const personalGrid = document.getElementById('personal-grid');
                if (querySnapshot.empty) {
                    personalGrid.innerHTML = '<div class="error-message">No personal photos found. Add some photos in the admin panel!</div>';
                } else {
                    personalGrid.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const photo = doc.data();
                        const photoElement = createPersonalPhotoElement(photo);
                        personalGrid.appendChild(photoElement);
                    });
                }
                document.getElementById('personal-loading').style.display = 'none';
            } catch (error) {
                console.error('Error loading personal photos:', error);
                document.getElementById('personal-loading').innerHTML = '<div class="error-message">Failed to load personal photos.</div>';
            }
        }

        function createPersonalPhotoElement(photo) {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-card';
            photoDiv.onclick = () => openMediaModal(photo.image);

            photoDiv.innerHTML = `
                <div class="photo-cover">
                    <img src="${photo.image}" alt="${photo.title}" class="card-image">
                </div>
                <div class="photo-overlay">
                    <h4>${photo.title}</h4>
                    <p>${photo.description}</p>
                </div>
            `;

            return photoDiv;
        }

        async function loadNotes() {
            try {
                const q = window.firestore.query(
                    window.firestore.collection(window.db, 'notes'),
                    window.firestore.orderBy('createdAt', 'desc')
                );
                const querySnapshot = await window.firestore.getDocs(q);
                const notesContainer = document.getElementById('notes-container');
                if (querySnapshot.empty) {
                    notesContainer.innerHTML = '<div class="error-message">No notes found. Create some notes in the admin panel!</div>';
                } else {
                    notesContainer.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const note = doc.data();
                        const noteElement = createNoteElement(note);
                        notesContainer.appendChild(noteElement);
                    });
                }
                document.getElementById('notes-loading').style.display = 'none';
            } catch (error) {
                console.error('Error loading notes:', error);
                document.getElementById('notes-loading').innerHTML = '<div class="error-message">Failed to load notes.</div>';
            }
        }

        function createNoteElement(note) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-card';
            noteDiv.onclick = () => openNoteModal(note.title, note.date, note.content);

            const date = new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            noteDiv.innerHTML = `
                <div class="note-date">${date}</div>
                <h3>${note.title}</h3>
                <p>${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}</p>
            `;

            return noteDiv;
        }

        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            document.body.insertBefore(errorDiv, document.body.firstChild);
        }


        window.openMediaModal = openMediaModal;
        window.openNoteModal = openNoteModal;
        window.closeModal = closeModal;

        function showMainContent() {
            const hero = document.querySelector('.hero');
            const mainContent = document.getElementById('main-content');
            const navbar = document.getElementById('navbar');


            hero.classList.add('collapsed');


            setTimeout(() => {
                mainContent.classList.add('show');
                navbar.classList.add('show');
            }, 400);
        }


        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');


                if (!document.getElementById('main-content').classList.contains('show')) {
                    showMainContent();

                    setTimeout(() => {
                        document.querySelector(targetId).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 1200);
                } else {

                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });


        function generateVideoThumbnail(videoPath) {
            return new Promise((resolve, reject) => {
                const video = document.createElement('video');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                video.crossOrigin = 'anonymous';
                video.muted = true;
                video.playsInline = true;

                video.onloadedmetadata = function () {

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;


                    const seekTime = Math.min(1, video.duration * 0.1);
                    video.currentTime = seekTime;
                };

                video.onseeked = function () {
                    try {

                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


                        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                        resolve(thumbnailDataUrl);
                    } catch (error) {
                        console.warn('Could not generate thumbnail for video:', videoPath, error);
                        resolve(null);
                    }
                };

                video.onerror = function (error) {
                    console.warn('Video loading error for thumbnail generation:', videoPath, error);
                    resolve(null);
                };


                video.src = videoPath;
                video.load();


                setTimeout(() => {
                    if (video.readyState < 2) {
                        console.warn('Video thumbnail generation timeout:', videoPath);
                        resolve(null);
                    }
                }, 10000);
            });
        }


        document.getElementById('discoverBtn').addEventListener('click', function (e) {
            e.preventDefault();
            showMainContent();

            setTimeout(() => {
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 1200);
        });


        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });


        function openMediaModal(src) {
            const modal = document.getElementById('mediaModal');
            const content = document.getElementById('mediaContent');


            modal.classList.add('fullscreen-modal');

            content.innerHTML = `<img src="${src}" alt="Full size image">`;
            modal.style.display = 'flex';
        }

        function openNoteModal(title, date, content) {
            const modal = document.getElementById('noteModal');
            const noteDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            document.getElementById('noteTitle').textContent = title;
            document.getElementById('noteDate').textContent = noteDate;


            const formattedContent = content
                .replace(/\n\n/g, '</p><p>') // Double newlines become paragraph breaks
                .replace(/\n/g, '<br>'); // Single newlines become line breaks

            document.getElementById('noteContent').innerHTML = '<p>' + formattedContent + '</p>';
            modal.style.display = 'block';
        }

        function closeModal() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
                modal.classList.remove('fullscreen-modal');
            });
        }


        window.onclick = function (event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        }


        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
            lastScrollTop = scrollTop;
        });


        function showTab(tabName) {

            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });


            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });


            document.getElementById(tabName).classList.add('active');


            event.target.classList.add('active');


            if (tabName === 'videos' && !document.getElementById('videos-container').hasChildNodes()) {
                loadVideos();
            }
        }


        async function loadVideos() {
            try {
                const querySnapshot = await window.firestore.getDocs(window.firestore.collection(window.db, 'videos'));
                const videosContainer = document.getElementById('videos-container');
                if (querySnapshot.empty) {
                    videosContainer.innerHTML = '<div class="error-message">No videos found. Add some videos in the admin panel!</div>';
                } else {
                    videosContainer.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const video = doc.data();
                        const videoElement = createVideoElement(video);
                        videosContainer.appendChild(videoElement);
                    });
                }
                document.getElementById('videos-loading').style.display = 'none';
            } catch (error) {
                console.error('Error loading videos:', error);
                document.getElementById('videos-loading').innerHTML = '<div class="error-message">Failed to load videos.</div>';
            }
        }

        function createVideoElement(video) {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'video-card';
            videoDiv.onclick = () => openVideoModal(video.videoPath);


            const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM3MTgwOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5O5IExvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

            videoDiv.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail || placeholderSrc}" alt="${video.title}" class="video-thumbnail-img">
            <div class="play-button">▶</div>
        </div>
        <div class="video-info">
            <h4>${video.title}</h4>
            <p>${video.description}</p>
        </div>
    `;


            if (!video.thumbnail) {
                generateVideoThumbnail(video.videoPath).then(generatedThumbnail => {
                    if (generatedThumbnail) {
                        const img = videoDiv.querySelector('.video-thumbnail-img');
                        img.src = generatedThumbnail;
                    } else {

                        const img = videoDiv.querySelector('.video-thumbnail-img');
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJkMzc0OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+4pa2PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNzAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VmlkZW88L3RleHQ+PC9zdmc+';
                    }
                }).catch(error => {
                    console.warn('Thumbnail generation failed:', error);
                });
            }

            return videoDiv;
        }

        function openVideoModal(videoPath) {
            const modal = document.getElementById('mediaModal');
            const content = document.getElementById('mediaContent');


            modal.classList.add('fullscreen-modal');

            content.innerHTML = `
        <video controls autoplay style="max-width: 95vw; max-height: 95vh; width: auto; height: auto;">
            <source src="${videoPath}" type="video/mp4">
            <source src="${videoPath}" type="video/webm">
            <source src="${videoPath}" type="video/ogg">
            Your browser does not support the video tag.
        </video>
    `;

            modal.style.display = 'flex';
        }