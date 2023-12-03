// TODO: Write your code here
function addNewItem(content) {
    let list = document.createElement('li');
    list.innerText = content;
    list.classList.add('item');
    document.querySelector('ul').append(list);
}
addNewItem('a');
addNewItem('b');
addNewItem('c');

document.querySelector('#my-inp').addEventListener('keydown', (event) => {
    const key = event.key;
    if(key == 'Enter') {
        addNewItem(document.querySelector('#my-inp').value);
        document.querySelector('#my-inp').value = "";
    }
});