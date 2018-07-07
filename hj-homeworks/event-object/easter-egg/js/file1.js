//'use strict';
//
//document.addEventListener('keydown', showNav);
//document.addEventListener('keydown', showSecret);
//document.addEventListener('keyup', hideNav);
//
//const nav = document.querySelector('nav');
//const secret = document.querySelector('.secret');
//
//function showNav(event) {
//    if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
//        nav.classList.add('visible');
//    }
//}  
//
//let code = '';
//function showSecret(event) {
//    code += event.code.replace('Key','').replace('Digit','').replace('CapsLock','').replace('Tab','').replace('Shift','').replace('Control','').replace('Alt','').replace('Left','');
//    if (code.search(/ytnjkjubz/i) !== -1) {
//        secret.classList.add('visible');
//        code = '';
//        return;
//    };
//    secret.classList.remove('visible');
//}
//
//
//function hideNav(event) {
//    nav.classList.remove('visible');
//}









