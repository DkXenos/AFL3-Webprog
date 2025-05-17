document.addEventListener('DOMContentLoaded', function() {

  const projectDetails = {
    'Rektor Cup Storyline': {
      image: 'Images/storyline-gif-2.mp4',
      description: 'Editor VFX.',
      category: 'Video'
    },
    'Rektor Cup Aftermovie': {
      image: 'videos/aftermovie-gif-2.mp4',
      description: 'Editor VFX.',
      category: 'Video'
    },
    'Entation Trailer': {
      image: 'videos/entation-gif-2.mp4',
      description: 'Main Editor.',
      category: 'Video'
    },
    'Bloggit': {
      image: 'videos/bloggit-img.jpeg',
      description: 'Hackathon Project.',
      category: 'Website'
    },
    'ThinkPlay': {
      image: 'videos/thinkplay-video.mp4',
      description: 'Java Game Project.',
      category: 'Application'
    },
    'Portofolio': {
      image: 'videos/portofolio-web.jpeg',
      description: 'My Personal Portofolio made with Next.js',
      category: 'Website'
    }
  };


  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .modal-transition {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .modal-bg-transition {
      transition: opacity 0.3s ease;
    }
    .modal-slide-in {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .modal-slide-in.show {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    body.modal-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(styleElement);


  if (!document.getElementById('project-modal-container')) {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'project-modal-container';
    modalContainer.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 modal-bg-transition flex items-center justify-center z-50 hidden';
    
    const modalContent = document.createElement('div');
    modalContent.id = 'project-modal-content';
    modalContent.className = 'bg-charcoal rounded-lg p-6 max-w-2xl w-full mx-4 relative transform modal-slide-in opacity-0 scale-95 shadow-xl';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200';
    closeButton.innerHTML = `
      <svg xmlns="http
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
    closeButton.addEventListener('click', closeModal);
    
    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    

    modalContainer.addEventListener('click', function(event) {
      if (event.target === modalContainer) {
        closeModal();
      }
    });
  }


  document.querySelectorAll('.project-button').forEach(button => {
    button.addEventListener('click', function() {
      const projectCard = this.closest('.project-card');
      const projectTitle = projectCard.querySelector('h3').textContent;
      const projectData = projectDetails[projectTitle] || {
        image: 'Images/placeholder.jpg',
        description: 'Project details coming soon.',
        category: 'Project'
      };
      
      openProjectModal(projectTitle, projectData);
    });
  });


  function openProjectModal(title, projectData) {
    const modalContainer = document.getElementById('project-modal-container');
    const modalContent = document.getElementById('project-modal-content');
    

    modalContent.innerHTML = `
      <button class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
        
      </button>
      <div class="flex items-center mb-6">
        <div class="w-2 h-6 bg-medium-purple mr-2"></div>
        <span class="text-gray-300 font-bold">${projectData.category}</span>
      </div>
      <h3 class="text-2xl md:text-3xl font-bold text-light-purple mb-4">${title}</h3>
      <div class="mb-6 rounded-lg overflow-hidden bg-charcoal border border-gray-700 hover:border-medium-purple transition-all duration-300">
        <img src="${projectData.image}" alt="${title}" class="w-full h-auto transform transition-transform duration-500 hover:scale-105" 
          onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'flex items-center justify-center h-48 bg-dark-purple bg-opacity-50\'><svg xmlns=\'http
      </div>
      <p class="text-gray-300 mb-4">${projectData.description}</p>
      <div class="mt-6 border-t border-gray-700 pt-4 text-gray-400 text-sm">
        <p>Click outside or press ESC to close</p>
      </div>
    `;
    

    modalContent.querySelector('button').addEventListener('click', closeModal);
    

    modalContainer.classList.remove('hidden');
    setTimeout(() => {
      modalContainer.classList.add('bg-opacity-70');
      modalContent.classList.add('show');
    }, 10);
    

    document.body.classList.add('modal-open');
    

    document.addEventListener('keydown', handleEscKey);
  }


  function closeModal() {
    const modalContainer = document.getElementById('project-modal-container');
    const modalContent = document.getElementById('project-modal-content');
    

    modalContainer.classList.remove('bg-opacity-70');
    modalContent.classList.remove('show');
    
    setTimeout(() => {
      modalContainer.classList.add('hidden');
    
      document.body.classList.remove('modal-open');
    }, 300);
    

    document.removeEventListener('keydown', handleEscKey);
  }


  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }


  if (typeof gsap !== 'undefined') {
    document.querySelectorAll('.project-button').forEach(button => {
      button.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects-header');
        
    
        gsap.to(projectsSection, {
          y: -10,
          duration: 0.3,
          ease: "power1.out",
          onComplete: function() {
            gsap.to(projectsSection, {
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)"
            });
          }
        });
        
    
        const modalContent = document.getElementById('project-modal-content');
        gsap.fromTo(modalContent,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      });
    });
  }
});