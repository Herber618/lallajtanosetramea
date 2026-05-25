# 🚕 Mapa de Trufis - Reporte de Zonas de Abandono

Aplicación web mobile-first para reportar y visualizar zonas donde abandonan los trufis.

## 📱 Características

### Pantallas Principales

1. **🗺️ Mapa de Calor** (Icono central)
   - Visualiza zonas de mayor abandono de trufis
   - Escala de colores: Rojo (Alto) → Amarillo (Medio) → Verde (Bajo)
   - Puntos interactivos con información detallada

2. **💬 Comunidad**
   - Espacio para que usuarios compartan experiencias
   - Reportar quejas sobre trufis que abandonan pasajeros
   - Límite de 500 caracteres por comentario
   - Comentarios guardados en el navegador

3. **📊 Estadísticas**
   - Datos generales del servicio
   - Usuarios activos
   - Reportes diarios
   - Calificaciones y tiempos promedio

4. **🔐 Cuenta**
   - Formulario de login/registro
   - Registro rápido y práctico
   - Cambio entre formularios

5. **🎵 TikTok** (Enlace directo)
   - Acceso directo al perfil de TikTok

## 🎨 Diseño

- **Mobile-First**: Optimizado para dispositivos móviles
- **Responsive**: Se adapta a cualquier tamaño de pantalla
- **Barra de Navegación Inferior**: Acceso rápido a todas las secciones
- **Gradiente Morado**: Diseño moderno y atractivo
- **Animaciones Suaves**: Transiciones elegantes entre páginas

## 🚀 Cómo Usar

1. **Abre `index.html`** en tu navegador
2. **Navega** usando los 5 iconos en la parte inferior
3. **Comparte experiencias** en la sección Comunidad
4. **Consulta el mapa** para ver zonas problemáticas
5. **Crea tu cuenta** para acceso persistente

## 📋 Estructura de Archivos

```
Nosetramea/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y diseño responsive
├── script.js       # Lógica y funcionalidades
└── README.md       # Este archivo
```

## 💾 Almacenamiento

- Los comentarios se guardan automáticamente en `localStorage`
- Los datos persisten entre sesiones del navegador

## 🔗 Dependencias

- **Leaflet.js**: Para mapas interactivos
- **Font Awesome**: Para iconos
- **OpenStreetMap**: Para datos cartográficos

## ⚙️ Personalización

### Cambiar ubicación del mapa
Modifica las coordenadas en `script.js`:
```javascript
map.setView([-16.5, -68.15], 12); // [latitud, longitud, zoom]
```

### Cambiar colores
Edita el gradiente en `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Agregar más puntos de calor
Agrega elementos al array `heatData` en `script.js`:
```javascript
{ lat: -16.50, lng: -68.15, intensity: 0.8 }
```

## 📱 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet (para mapas)
- JavaScript habilitado

## 🎯 Casos de Uso

- Reportar zonas donde dejan abandonados a pasajeros
- Conectar con otros usuarios en la comunidad
- Consultar mapa antes de pedir trufi
- Crear cuenta para seguimiento de reportes

## 📞 Soporte

Si tienes dudas o problemas:
1. Verifica que tu navegador esté actualizado
2. Limpia el caché del navegador
3. Revisa la consola del navegador para errores

---

**Versión**: 1.0
**Última actualización**: Junio 2026
**Licencia**: Código libre para uso personal y educativo
