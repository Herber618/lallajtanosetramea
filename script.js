// ==================== VARIABLES GLOBALES ====================
let map;
let heatLayer;
let currentPage = 'mapPage';
const comments = [];

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupEventListeners();
    loadComments();
    setupReportButton();
    
    // Mostrar primera página
    showPage('mapPage');
});

// ==================== FUNCIONES DEL MAPA ====================
function initMap() {
    // Crear mapa centrado en Cochabamba, Bolivia
    map = L.map('map').setView([-17.3895, -66.1568], 15);

    // Capa de maqueta (tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Datos de puntos de abandono simulados - Cochabamba
    const heatData = [
        { lat: -17.38, lng: -66.15, intensity: 0.9 }, // Zona caliente 1 - Centro
        { lat: -17.40, lng: -66.16, intensity: 0.8 }, // Zona caliente 2
        { lat: -17.36, lng: -66.14, intensity: 0.7 }, // Zona media
        { lat: -17.42, lng: -66.17, intensity: 0.5 }, // Zona media-baja
        { lat: -17.35, lng: -66.12, intensity: 0.6 }, // Zona media
        { lat: -17.43, lng: -66.18, intensity: 0.4 }, // Zona baja
        { lat: -17.39, lng: -66.19, intensity: 0.8 }, // Zona caliente 3
        { lat: -17.41, lng: -66.15, intensity: 0.7 }, // Zona media-alta
        { lat: -17.37, lng: -66.13, intensity: 0.6 }, // Zona media
        { lat: -17.39, lng: -66.16, intensity: 0.5 }, // Zona media-baja
        { lat: -17.34, lng: -66.11, intensity: 0.7 }, // Zona media-alta
        { lat: -17.40, lng: -66.17, intensity: 0.9 }, // Zona caliente 4
    ];

    // Convertir datos para la visualización de calor
    const heatPoints = heatData.map(point => [
        point.lat,
        point.lng,
        point.intensity
    ]);

    // Crear círculos de densidad
    heatData.forEach(point => {
        let color;
        if (point.intensity >= 0.7) {
            color = '#ff4444'; // Rojo - Alto abandono
        } else if (point.intensity >= 0.5) {
            color = '#ffbb33'; // Amarillo - Medio
        } else {
            color = '#44bb44'; // Verde - Bajo
        }

        L.circleMarker([point.lat, point.lng], {
            radius: 8 + (point.intensity * 10),
            fillColor: color,
            color: 'rgba(0,0,0,0.2)',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.5 + (point.intensity * 0.5)
        }).addTo(map).bindPopup(`
            <strong>Zona de abandono</strong><br>
            Intensidad: ${Math.round(point.intensity * 100)}%
        `);
    });

    // Agregar marcador de referencia
    L.marker([-17.3895, -66.1568], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map).bindPopup('Centro de Cochabamba');
}

// ==================== NAVEGACIÓN DE PÁGINAS ====================
function showPage(pageId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar página seleccionada
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        currentPage = pageId;
    }

    // Actualizar estado de botones de navegación
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Activar botón correcto
    const activeButton = document.querySelector(`.nav-item[onclick="showPage('${pageId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Redimensionar mapa si es necesario
    if (pageId === 'mapPage' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

// ==================== GESTIÓN DE COMENTARIOS ====================
function setupEventListeners() {
    const commentText = document.getElementById('commentText');
    const submitButton = document.getElementById('submitComment');
    const charCount = document.getElementById('charCount');

    // Actualizar contador de caracteres
    if (commentText) {
        commentText.addEventListener('input', function() {
            charCount.textContent = this.value.length + '/500';
        });
    }

    // Enviar comentario
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            if (commentText.value.trim()) {
                addComment(commentText.value);
                commentText.value = '';
                charCount.textContent = '0/500';
            } else {
                alert('Por favor escribe un comentario');
            }
        });
    }

    // Permitir Enter para enviar
    if (commentText) {
        commentText.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                submitButton.click();
            }
        });
    }
}

// ==================== BOTÓN DE REPORTE ====================
function setupReportButton() {
    const reportButton = document.getElementById('reportButton');
    if (reportButton) {
        reportButton.addEventListener('click', function() {
            // Redirigir a la sección de comunidad
            showPage('communityPage');
            
            // Enfocar el textarea
            setTimeout(() => {
                const commentText = document.getElementById('commentText');
                if (commentText) {
                    commentText.focus();
                    commentText.value = '¡El trufi me abandonó! ';
                    commentText.dispatchEvent(new Event('input'));
                }
            }, 300);
            
            showNotification('¡Reporta tu experiencia en la comunidad!');
        });
    }
}

function addComment(text) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateString = now.toLocaleDateString('es-ES');

    const comment = {
        id: Date.now(),
        text: text,
        author: `Usuario ${Math.floor(Math.random() * 1000)}`,
        time: timeString,
        date: dateString
    };

    comments.unshift(comment);
    saveComments();
    renderComments();
    
    // Mostrar notificación
    showNotification('¡Comentario publicado!');
}

function renderComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #999;">
                <p style="font-size: 30px; margin-bottom: 10px;">💬</p>
                <p>Aún no hay comentarios</p>
                <p style="font-size: 12px;">¡Sé el primero en compartir tu experiencia!</p>
            </div>
        `;
        return;
    }

    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';
        commentCard.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.time}</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
        `;
        commentsList.appendChild(commentCard);
    });
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    const saved = localStorage.getItem('comments');
    if (saved) {
        comments.push(...JSON.parse(saved));
        renderComments();
    }
}

// ==================== FORMULARIO DE AUTENTICACIÓN ====================
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

// Manejar envío de formularios
document.addEventListener('submit', function(e) {
    if (e.target.closest('.auth-form')) {
        e.preventDefault();
        
        const isRegister = document.getElementById('registerForm').classList.contains('active') || 
                          document.getElementById('registerForm').style.display !== 'none' &&
                          document.getElementById('loginForm').classList.contains('hidden');

        if (isRegister) {
            showNotification('¡Cuenta creada! Bienvenido.');
        } else {
            showNotification('¡Sesión iniciada correctamente!');
        }

        // Limpiar formulario
        e.target.reset();
    }
});

// ==================== UTILIDADES ====================
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        font-size: 14px;
        animation: slideDown 0.3s ease-out;
        max-width: 90%;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animar salida después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== ESTILOS DE ANIMACIÓN ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ==================== MANEJO DE CAMBIO DE ORIENTACIÓN ====================
window.addEventListener('orientationchange', function() {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});
