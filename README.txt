AC&C - Presentaciones Institucionales PWA V1.9

OBJETIVO DE V1.9
- No se modifica el diseño del documento ni el motor PDF de V1.8.
- Se corrige exclusivamente el sistema de actualización de la PWA.

NUEVO SISTEMA DE ACTUALIZACIÓN
- La PWA consulta version.json sin caché.
- Si detecta una versión nueva muestra “Nueva versión disponible”.
- El usuario pulsa “Actualizar ahora”.
- Se activa el nuevo service worker, se eliminan cachés anteriores y se recarga la PWA.
- index.html, manifest.json y version.json se consultan primero en red para evitar quedar atrapados en una versión antigua.

VERSIÓN
V1.9
Cache: acc-presentaciones-v1.9.0

CLAVE
Acc+2026

IMPORTANTE PARA PASAR DESDE UNA PWA ANTIGUA (V1.7/V1.8)
La versión antigua todavía no conoce este nuevo actualizador.
Después de publicar V1.9, abra UNA SOLA VEZ desde el navegador del celular:
https://xentroplus.github.io/acc-presentaciones/?v=1.9

Esto fuerza la carga del nuevo index y del nuevo service worker sin reinstalar.
Desde V1.9 en adelante, las futuras versiones podrán mostrar el botón “Actualizar ahora”.
