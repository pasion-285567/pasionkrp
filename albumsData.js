export const albumsData = {
    "album1": {
        title: "Best Friends",
        count: "7 photos",
        get previewImages() {
            return this.images.slice(0, 3);
        },
        images: [
            "Albums/Album1/image1.jpg",
            "Albums/Album1/image2.jpg",
            "Albums/Album1/image3.jpg",
            "Albums/Album1/image4.jpg",
            "Albums/Album1/image5.jpg",
            "Albums/Album1/image6.jpg",
            "Albums/Album1/image7.jpg"
        ]
    },
    "album2": {
        title: "Lokal ng Sta. Maria",
        count: "10 photos",
        get previewImages() {
            return this.images.slice(0, 3);
        },
        images: [
            "Albums/Album2/image1.jpg",
            "Albums/Album2/image2.jpg",
            "Albums/Album2/image3.jpg",
            "Albums/Album2/image4.jpg",
            "Albums/Album2/image5.jpg",
            "Albums/Album2/image6.jpg",
            "Albums/Album2/image7.jpg",
            "Albums/Album2/image8.jpg",
            "Albums/Album2/image9.jpg",
            "Albums/Album2/image10.jpg"
        ]
    },
    "album3": {
        title: "Lokal ng Catmon",
        count: "9 photos",
        get previewImages() {
            return this.images.slice(0, 3);
        },
        images: [
            "Albums/Album3/image1.jpg",
            "Albums/Album3/image2.jpg",
            "Albums/Album3/image3.jpg",
            "Albums/Album3/image4.jpg",
            "Albums/Album3/image5.jpg",
            "Albums/Album3/image6.jpg",
            "Albums/Album3/image7.jpg",
            "Albums/Album3/image8.jpg",
            "Albums/Album3/image9.jpg"
        ]
    },
    "album4": {
        title: "Brianna & Paula",
        count: "10 photos",
        get previewImages() {
            return this.images.slice(0, 3);
        },
        images: [
            "Albums/Album4/image1.jpg",
            "Albums/Album4/image2.jpg",
            "Albums/Album4/image3.jpg",
            "Albums/Album4/image4.jpg",
            "Albums/Album4/image5.jpg",
            "Albums/Album4/image6.jpg",
            "Albums/Album4/image7.jpg",
            "Albums/Album4/image8.jpg",
            "Albums/Album4/image9.jpg",
            "Albums/Album4/image10.jpg"
        ]
    }
};