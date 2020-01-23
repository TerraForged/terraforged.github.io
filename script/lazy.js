document.addEventListener("DOMContentLoaded", function() {
    handleImages();
});

function handleImages() {
    let lazyImages = [].slice.call(document.querySelectorAll("img"));
    let active = false;

    const lazyLoad = function() {
        if (active === false) {
            active = true;

            setTimeout(function() {
                lazyImages.forEach(function(img) {
                    if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }

                        // remove from images to be processed
                        lazyImages = lazyImages.filter(function(image) {
                            return image !== img;
                        });
                    }

                    if (lazyImages.length === 0) {
                        document.removeEventListener("scroll", lazyLoad);
                        window.removeEventListener("resize", lazyLoad);
                        window.removeEventListener("orientationchange", lazyLoad);
                    }
                });

                active = false;
            }, 200);
        }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
}