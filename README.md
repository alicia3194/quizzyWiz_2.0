# 🎮 QuizzyWiz 2.0 🎮


El proyecto **QuizzyWiz 2.0** tiene como objetivo principal proporcionar una experiencia de cuestionario interactiva y educativa. El Quiz constará de 10 preguntas, cada una de las cuales tendrá 4 opciones de respuesta, de las cuales solo una será la correcta. Estas preguntas pueden ser tanto generadas internamente como importadas desde la **API** de preguntas en línea **OpenTDB**.

La aplicación será una página de una sola vista (Single Page Application - SPA) que mostrará una pregunta a la vez en la pantalla, permitiendo a los usuarios seleccionar su respuesta.

## Requisitos 💯
Para cumplir con los objetivos establecidos, el proyecto debe cumplir con los siguientes requisitos:

- *Manipulación dinámica del DOM:* El proyecto deberá utilizar JavaScript para modificar dinámicamente el contenido del documento HTML, mostrando preguntas y opciones de respuesta de forma interactiva.

- *Crear una página SPA para las preguntas:* La aplicación deberá ser una SPA que muestre una sola pregunta a la vez, permitiendo a los usuarios avanzar a la siguiente pregunta.

- *Manejo de ES6:* Se utilizará JavaScript ES6 para aprovechar las últimas características del lenguaje.

- *Asincronía:* Las preguntas se obtendrán a través de la API de preguntas de OpenTDB, lo que requerirá el manejo de operaciones asincrónicas para cargar las preguntas de manera eficiente.

- *APIs HTML5:* La aplicación hará uso de características de HTML5 como el almacenamiento local (LocalStorage) para guardar el progreso del usuario y podría incluir gráficos u otras características de HTML5 para mejorar la experiencia del usuario.

- *Uso de Firebase Auth y Firebase Firestore:* La autenticación de usuarios se realizará utilizando Firebase Auth, y Firebase Firestore se utilizará para almacenar información relevante del usuario y los resultados de las pruebas.

- *Sin frameworks ni librerías externas en la medida de lo posible:* Se evitarán frameworks o librerías externas siempre que sea posible, fomentando el desarrollo personalizado y el conocimiento profundo de las tecnologías utilizadas.

- *Gestión del proyecto con GitHub:* El proyecto se gestionará a través de GitHub, utilizando repositorios para control de versiones y seguimiento de problemas.

- *Código limpio y buenas prácticas:* El código se mantendrá limpio y se seguirán buenas prácticas de desarrollo de software para garantizar la legibilidad, mantenibilidad y escalabilidad del proyecto.

- *Desplegar la app en GitHub Pages:* La aplicación se desplegará en GitHub Pages para que sea accesible en línea. Puedes acceder a la versión en línea del proyecto a través del siguiente enlace: (https://alicia3194.github.io/quizzyWiz_2.0/)

## Organización del Proyecto 💬

En este proyecto, hemos utilizado **Trello**, una plataforma de gestión de proyectos, para organizar nuestras tareas y objetivos. Trello nos ha proporcionado una forma efectiva de seguir el progreso de nuestro proyecto y coordinar el trabajo en equipo. Hemos creado tarjetas de Trello para representar cada objetivo, tarea o funcionalidad que debemos abordar, lo que nos ha permitido mantener un seguimiento detallado de nuestras metas y plazos.

<img src="./imageMain/trello.png" width="750" height="450"/>

## Ramas y Desarrollo de Funcionalidades 🪢

Para mantener nuestro proyecto organizado y garantizar un desarrollo seguro, hemos empleado un enfoque de ramas en nuestro repositorio de Git. Cada funcionalidad o característica importante se ha desarrollado en su propia rama separada antes de fusionarse con la rama principal *main*.

## Posibles Mejoras 💪

El proyecto actual es un punto de partida sólido, pero hay espacio para mejoras y características adicionales. Aquí hay algunas sugerencias para futuras mejoras:

### 1. Gráfica de Resultados de Jugadores

Actualmente, el proyecto almacena los resultados del juego en Firebase, pero no muestra gráficos para visualizar el progreso de los jugadores. Puedes considerar la implementación de una gráfica que muestre los resultados históricos de un jugador en comparación con el tiempo. Esto proporcionará una visión más detallada del rendimiento de un jugador.

### 2. Ranking de Jugadores

Otra característica interesante podría ser la creación de un sistema de clasificación o ranking para los jugadores. Esto podría basarse en el número de preguntas correctas o en el porcentaje de respuestas correctas. Mostrar una tabla de clasificación con los nombres de usuario y sus posiciones en el ranking puede agregar una dimensión competitiva al juego.

### 3. Resaltar respuestas marcadas:

Cuando el usuario selecciona una respuesta a una pregunta, resaltar visualmente la respuesta que han seleccionado. 

### 4. Indicar respuesta correcta: 

Después de que el usuario responda a una pregunta, proporcionar retroalimentación sobre si su respuesta fue correcta o incorrecta. 
