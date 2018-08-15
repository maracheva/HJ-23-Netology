'use strict';

function handleTableClick(event) {
    if (event.target.tagName !== 'TH') {
        return;
    } else {
        (event.target.dataset.dir == '1') ? event.target.dataset.dir = -1 : event.target.dataset.dir = 1; 
        event.currentTarget.dataset.sortBy = event.target.dataset.propName;
        sortTable(event.target.dataset.propName, event.target.dataset.dir);

    }
}

