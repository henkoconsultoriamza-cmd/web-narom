# Proceso de imágenes del panel

El mismo componente `ImageUpload` procesa todas las imágenes que carga el cliente: promociones, productos, equipo y empresa. Cambiar imágenes no requiere editar el código ni volver a publicar la web.

1. Validar que sea un JPG, PNG o WebP legible de hasta 8 MB y 40 megapíxeles.
2. Aplicar la política del destino definida en `src/lib/image-policy.ts`.
3. Conservar proporción, orientación y transparencia. No agrandar ni recomprimir imágenes que ya cumplen la política.
4. Si hace falta, redimensionar y codificar WebP. Reducir dimensiones proporcionalmente hasta cumplir el límite, manteniendo calidad de 80 o más.
5. Verificar nuevamente el peso antes de llamar a Storage. Un error mantiene la imagen anterior y muestra el motivo en el panel.
6. Guardar con nombre único `optimized-v1-<destino>-<uuid>.<formato>`, tipo de contenido correcto y caché de un año. Cada reemplazo genera una URL nueva; no pisa el archivo anterior.
7. El guardado habitual del panel publica esa URL en el contenido del sitio. Las escrituras se serializan para que una respuesta anterior no reemplace un cambio más nuevo. El aviso de éxito aparece después de la confirmación del servidor; los errores se informan y permiten reintentar.
8. La web entrega directamente los archivos preparados, solicita tamaños menores cuando corresponde y carga las secciones posteriores a medida que el visitante se acerca. Los archivos anteriores siguen teniendo optimización de entrega.

## Límites de salida

| Destino | Ancho máximo | Alto máximo | Peso máximo |
|---|---:|---:|---:|
| Banner de escritorio | 1920 px | 1920 px | 450 KiB |
| Banner móvil | 800 px | 1200 px | 250 KiB |
| Producto | 640 px | 640 px | 120 KiB |
| Foto de equipo | 400 px | 600 px | 100 KiB |
| Empresa | 1200 px | 1000 px | 250 KiB |

Son límites máximos; no son proporciones de recorte. El usuario elige el encuadre de su pieza. El carrusel mantiene su avance de 4500 ms y sus controles; no se pausa por descargas.

## Verificación antes de publicar cambios en este proceso

- Ejecutar `npm run build` y `npm run lint`.
- Ejecutar `npm run dev -- --host 127.0.0.1 --port 4174` y abrir `http://127.0.0.1:4174/tests/image-pipeline.html`. Todas las pruebas deben aprobarse. Verifican peso real, dimensiones, proporción, transparencia, archivos inválidos, entrega de nuevas imágenes, guardados simultáneos y recuperación ante errores.
- Verificar el sitio en escritorio y móvil. El banner debe conservar su cadencia, sin retirar del DOM imágenes ya preparadas entre transiciones.
- No probar guardados con imágenes ficticias sobre el contenido real del cliente. Las pruebas de conversión son locales y no envían archivos a Storage.

La política vive en un único archivo. Si se modifica, actualizar esta tabla y volver a ejecutar las pruebas. No agregar controles de carga que salteen `prepareImage` y `assertPreparedImage`.
