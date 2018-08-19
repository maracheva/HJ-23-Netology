'use strict';

function handleTableClick(event) {
    if (event.target.tagName === 'TH') {
        event.target.dataset.dir = event.target.dataset.dir === '1' ? '-1': '1'; 
        event.currentTarget.dataset.sortBy = event.target.dataset.propName;
        sortTable(event.target.dataset.propName, event.target.dataset.dir);

    }
}

