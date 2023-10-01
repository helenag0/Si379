let index = 0;
let timerID = null;
let events = [];

function setup() {

    const thumbnails = document.querySelectorAll('#thumbnails img');
    
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.addEventListener('click', () => {
            index = i; 
            clearTimeout(timerID);
            setSelectedIndex(index);
            startRotation();
            // thumbnail.classList.add("selected");
        });
    });
}


function setSelectedIndex(index) {

    const currEl = events[index];
    document.querySelector('#selected-image').setAttribute("src", currEl.image_url);

    document.querySelector('#selected-title').innerHTML = currEl.event_title;
    document.querySelector('#selected-title').setAttribute("href", currEl.permalink);
    document.querySelector('#selected-date').innerHTML = getReadableTime(currEl.datetime_start);
    document.querySelector('#selected-description').innerHTML = currEl.description;

    // remove selected class
    const thumbnails = document.querySelectorAll('#thumbnails img');
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove("selected");
    });

    // add selected class
    thumbnails[index].classList.add("selected");

}



function rotate() {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
        index = (index + 1) % events.length;
        setSelectedIndex(index);
        rotate(); 
    }, 10000);
}


getUMEventsWithImages(function(fetchedEvents) {
    const thumbnailContainer = document.querySelector('#thumbnails');
    events = fetchedEvents;
    events.forEach((event, i) => {
        const image = document.createElement('img');
        image.setAttribute("src", event.styled_images.event_thumb);
        image.setAttribute("id", `thumb-${i}`);
        thumbnailContainer.append(image);
        // imgEvents.push(event);
    });


    setup();
    setSelectedIndex(index);
    rotate(); 
});

