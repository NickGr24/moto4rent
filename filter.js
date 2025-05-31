document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.moto-card');
    let isAnimating = false;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category').split(',');

                if (categories.includes(category)) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.classList.remove('hide');
                    });
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
            setTimeout(() => { isAnimating = false; }, 500);
        });
    });
});
