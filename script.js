document.addEventListener('DOMContentLoaded', function() {
    const boutonMenu = document.querySelector('.ham-menu');
    const menuRideau = document.querySelector('.off-screen-menu');

    if (boutonMenu && menuRideau) {
        boutonMenu.addEventListener('click', function() {
            boutonMenu.classList.toggle('active');
            menuRideau.classList.toggle('active');
        });
    }

    const grilleProjets = document.querySelector('.gallery-container');
    if (grilleProjets && !document.getElementById('gallery-target')) {
        
        fetch('projets.json')
            .then(reponse => reponse.json())
            .then(listeProjets => {
                
                for (let i = 0; i < listeProjets.length; i++) {
                    const projet = listeProjets[i];

                    let htmlTags = "";
                    if (projet["tags-miniature"]) {
                        for (let tag of projet["tags-miniature"]) {
                            htmlTags += `<span class="tag">${tag}</span>`;
                        }
                    }

                    const carte = `
                        <a href="projet.html?id=${i}" class="gallery-item-link">
                            <div class="gallery-item" data-category="${projet.category}">
                                <img src="${projet["image-miniature"]}" class="project-image" alt="cover${projet["title-projet"]}"> 
                                <h2 class="project-title">${projet["title-projet"]}</h2>
                                <div class="tags-container">${htmlTags}</div>
                            </div>
                        </a>`;
                    
                    grilleProjets.innerHTML += carte;
                }
                
                activerLesFiltres('.gallery-item-link', '.gallery-item');
            });
    }

    const grillePhotos = document.getElementById('gallery-target');
    
    if (grillePhotos) {
        fetch('photos.json')
            .then(reponse => reponse.json())
            .then(listePhotos => {
                
                for (let photo of listePhotos) {
                    const htmlPhoto = `
                        <div class="photo-item" data-category="${photo.category}">
                            <img src="${photo.url}" alt="Photo">
                        </div>`;
                    grillePhotos.innerHTML += htmlPhoto;
                }
                
                activerLesFiltres('.photo-item', null);

                const filtreLondres = document.querySelector('.filter-link[data-filter="londres"]');
                if (filtreLondres) filtreLondres.click();
            });
    }
});


function activerLesFiltres(selecteurElements, selecteurEnfant) {
    const liensFiltres = document.querySelectorAll('.filter-link');

    liensFiltres.forEach(lien => {
        lien.addEventListener('click', function(evenement) {
            evenement.preventDefault();

            liensFiltres.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const categorieChoisie = this.getAttribute('data-filter');

            document.querySelectorAll(selecteurElements).forEach(item => {
                let categorieElement = "";
                
                if (selecteurEnfant) {
                    const enfant = item.querySelector(selecteurEnfant);
                    categorieElement = enfant ? enfant.getAttribute('data-category') : "";
                } else {
                    categorieElement = item.getAttribute('data-category');
                }

                if (categorieChoisie === 'all' || categorieElement.includes(categorieChoisie)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
}