const slidesData = [
    {
        image: "background1.png",
        title: "Cea mai bună modalitate de a te relaxa în weekend.",
        subtitle: "Obține cele mai bune prețuri pentru plimbările de vineri până luni."
    },
    {
        image: "background2.png",
        title: "Descoperă libertatea pe două roți!",
        subtitle: "Rezervă o motocicletă ușor și rapid."
    },
    {
        image: "background3.png",
        title: "Aventuri de neuitat te așteaptă!",
        subtitle: "Motoarele noastre – confort și siguranță."
    }
];

let currentSlide = 0;
function showSlide(index) {
    const slide = slidesData[index];
    document.getElementById('hero-bg').src = slide.image;
    document.getElementById('hero-title').textContent = slide.title;
    document.getElementById('hero-subtitle').textContent = slide.subtitle;

    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });
}

document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        currentSlide = idx;
        showSlide(currentSlide);
    });
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slidesData.length;
    showSlide(currentSlide);
}, 6000);

showSlide(currentSlide);
