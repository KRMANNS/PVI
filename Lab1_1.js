function showTooltip(element) {
    element.querySelector('.tooltip').style.display = 'block';
}

function hideTooltip(element) {
    element.querySelector('.tooltip').style.display = 'none';
}
function showTooltip2(element) {
    element.querySelector('.tooltip2').style.display = 'block';
}

function hideTooltip2(element) {
    element.querySelector('.tooltip2').style.display = 'none';
}
function changeImage(isHover) {
    const bell = document.getElementById("bell");
    bell.src = isHover ? "icons8-напоминания.gif" : "bell_1827349.png"; // Замініть "..." на шлях до іншого зображення
    
}