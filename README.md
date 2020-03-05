# hci-quijote

Función para dialogflow para el proyecto

Estado de construcción: [![Build Status](https://travis-ci.com/next-francisconavarro/hci-quijote.svg?token=ib9y79vS62CpnkbzRHxm&branch=master)](https://travis-ci.com/next-francisconavarro/hci-quijote)


## Guía instalación firebase cli

Se puede ver en este enlace

https://firebase.google.com/docs/cli?hl=es#install-cli-mac-linux

Una vez instalada, para crear un proyecto de funciones:

     firebase login

     firebase projects:list
	
	   firebase init
          Functions: Configure and deploy Cloud Functions
          
Una vez que tienes arrancada la función, para conseguir el token

* Generate Firebase CI token

       firebase login:ci


## Configuración de distintas ramas en Dialogflow

Se accede al proyecto en la consola https://dialogflow.cloud.google.com/  y se pulsa en la rueda de configuración. Hay que habilitar `BETA FEATURES`.
Al hacerlo se habilita la pestaña `Enviroments` y se puede publicar una nueva versión apuntando a una url de firebase concreta. Luego cuando probamos en el assistant https://dialogflow.cloud.google.com/#/assistant_preview arriba a la derecha podemos elegir `Change version`, para seleccionar una concreta, con lo que apuntaría a una funcion concreta de dialogflow.




          Functions: Configure and deploy Cloud Functions
