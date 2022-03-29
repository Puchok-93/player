import { musicPlayerInit } from './musicPlayer.js';


const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');

const deactivationPlayer = () => {
    playerBlock.forEach(item => item.classList.remove('active'));
    playerBtn.forEach(item => item.classList.remove('active'));
};

playerBtn.forEach((btn,i) => btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));

musicPlayerInit();