function toggleTooltip(element) {
    document.querySelectorAll('.spell-slot').forEach(slot => {
        if (slot !== element) slot.classList.remove('active');
    });
    element.classList.toggle('active');
}

function toggleTooltipMeele(element) {
    document.querySelectorAll('.meele-slot').forEach(slot => {
        if (slot !== element) slot.classList.remove('active');
    });
    element.classList.toggle('active');
}

function toggleTooltipLeftGear(element) {
    document.querySelectorAll('.leftGear-slot').forEach(slot => {
        if (slot !== element) slot.classList.remove('active');
    });
    element.classList.toggle('active');
}

function toggleTooltipRightGear(element) {
    document.querySelectorAll('.rightGear-slot').forEach(slot => {
        if (slot !== element) slot.classList.remove('active');
    });
    element.classList.toggle('active');
}