const teamList = document.querySelector('.team-list');
const projectList = document.querySelector('.project-list');
const openProjectModalBtn = document.querySelector('.open-project-modal');

function openModalProj() {
  var element = document.getElementById('modalCreateProject');
  element.classList.add('is-active');
}

function loadTeamPage(event) {
  const selected = event.target[event.target.selectedIndex].value;
  window.location = selected;
}

teamList.addEventListener('change', loadTeamPage);
projectList.addEventListener('change', loadTeamPage);
openProjectModalBtn.addEventListener('click', openModalProj);
