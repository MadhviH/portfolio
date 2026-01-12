document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id') || 0;

    fetch('projets.json')
        .then(response => response.json())
        .then(projectList => {
            
            const currentProject = projectList[projectId]; 
            
            document.getElementById('projet-titre').textContent = currentProject["title-projet"];
            
            const tagsContainer = document.getElementById('projet-tags');
            if (currentProject["tags-container"]) {
                currentProject["tags-container"].forEach(tag => {
                    if (tag === "BREAK_LINE") {
                        tagsContainer.insertAdjacentHTML('beforeend', '<span class="break-line"></span>');
                    } else {
                        tagsContainer.insertAdjacentHTML('beforeend', `<span class="tag">${tag}</span>`);
                    }
                });
            }

            const descriptionContainer = document.getElementById('projet-description');
            const dateHtml = currentProject.date ? `<span class="date-projet">${currentProject.date}</span><br><br>` : '';
            descriptionContainer.innerHTML = dateHtml + currentProject.presentation.join('<br><br>');

            if (currentProject["project-url"]) {
                descriptionContainer.insertAdjacentHTML('beforeend', `
                    <div class="cta-container">
                        <a href="${currentProject["project-url"]}" target="_blank" class="btn-projet">
                            Voir le projet
                        </a>
                    </div>`);
            }
            const galleryContainer = document.getElementById('projet-galerie');
            
            if (currentProject.video_url) {
                galleryContainer.insertAdjacentHTML('beforeend', `
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${currentProject.video_url}" frameborder="0" allowfullscreen></iframe>
                    </div>`);
            }

            const projectImages = currentProject["project-gallery"];
            if (projectImages && Array.isArray(projectImages) && projectImages.length > 0) {
                projectImages.forEach(image => {
                    galleryContainer.insertAdjacentHTML('beforeend', `
                        <img src="${image.src}" alt="${image.alt}" class="gallery-image">
                    `);
                });
            }
        })
        .catch(error => {
            console.error("Error loading project details:", error);
        });
});