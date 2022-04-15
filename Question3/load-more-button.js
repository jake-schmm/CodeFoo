
// Idea for code borrowed from: https://www.markuptag.com/javascript-load-more-content-on-click-button/
function addContent() {
const loadmore = document.querySelector('#loadMore');
    let currentItems = 2;
    loadmore.addEventListener('click', (e) => {
        const elementList = [...document.querySelectorAll('.scrollable-field .videoElement')];
        for (let i = currentItems; i < currentItems + 2; i++) {
            if (elementList[i]) {
                elementList[i].style.display = 'block';
            }
        }
        currentItems += 2;

        // Load more button will be hidden after list fully loaded
        if (currentItems >= elementList.length) {
            event.target.style.display = 'none';
        }
    })
}