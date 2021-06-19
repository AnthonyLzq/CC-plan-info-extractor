# CC Plan Info Extractor

A tool to extract the content from the 2018 Studies Plan of CC.

## Prerequisites

- You need to have `Node.js` and `yarn` installed.

- This project is currently using `Node 14.17.1` and `yarn 1.22.10`.

Clone this project and run the following commands in your terminal:

1. To install all the dependencies:
    ```console
    yarn
    ```

## Usage

Once you have done the step shown above, run the following command in your terminal:

```console
yarn service
```

This will run the project in development mode (production is not ready yet). You will get an output as follows:

```bash
yarn run v1.22.10
$ nodemon
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): .env src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node -r dotenv/config ./src/index`
{
  pageContent: {
    analyticProgram: [],
    competencies: [
      'Conocimientos básicos sobre el uso y programación de los ordenadores, sistemas operativos, bases de datos y programas informáticos con aplicación en ingeniería.',
      'Conocimiento de la estructura, organización, funcionamiento e interconexión de los sistemas informáticos, los fundamentos de su programación, y su aplicación para la resolución de problemas propios de la ingeniería.',
      'Escribir algoritmos básicos para resolución de problemas científicos.',
      'Conocimiento de la metodología de programación.',
      'Adquisición de competencias específicas de la utilización de los lenguajes de programación.'
    ],
    generalInfo: 'ASIGNATURA : FUNDAMENTOS DE  LA PROGRAMACIÓN CÓDIGO : CC 212 CRÉDITOS : 06 PRE - REQUISITO : BIC01 – INTRODUCCIÓN A LA CIENCIA DE LA COMPUTACIÓN CONDICIÓN : OBLIGATORIO HORAS POR SEMANA : 06 (TEORÍA: 0 2 ,  LABORATORIO: 04 ) SISTEMA DE EVALUACIÓN : G',
    sommelier: 'Fundamentos de la programación será la asignatura que sentará las bases y establecerá los conceptos  básicos y principales de la carrera de Ciencia de la Computación, siendo esta la asignatura base de la  que el alumno desarrollará sus destrezas hacia un cie ntífico de la computación. En este sentido, e ste curso introducirá a los participantes en los conceptos fundamentales de este arte.  Los  tópicos  incluyen  tipos  de  datos,  estructuras  de  control,  funciones,  listas,  recursividad  y  la  mecánica de la ejecución,  prueba y depuración. '
  }
}
[nodemon] clean exit - waiting for changes before restart
```


## Author
-   **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).