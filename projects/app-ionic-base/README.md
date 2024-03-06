lib para generar aplicaciones ionic-angular

lugar: ionic/lib. Aquí estará la lib. 


Ofrece:
    * Servicios
        1.- UtilService. Servicio para hacer funciones varios (gestion menu más importante)
        subjectSetMenu: para gestionaar los cambios de menu (carga y vaciado)    

        appTitle. Titulo de la app

        MenuRefresh:

        2.- SeguridadService
        subjectUser : para detectar cambios de estado de usuario
        subjecCountDownSessionLastMin: saber cuando entramos en el minuto final de la session

        initCountDownSession : inicio de la cuanta atras de la session de usuario establecida en el servidor
        CheckCountDownSession: diferentes comportamiento segun el tiempo que queda para finalizar session.
                               dispara un settime con el tiempo hasta fin de session.
                               si session está en el último min, lanza subjecCountDownSessionLastMin
                               Cuando llega a fin de session, desactiva todo (menu, icono user...   )

        UserClear: limpia el usuario del localStorage
        SessionKO: UserClear, limpia menu y va a router /
        UserGuardar: guarda usuario en el localStorage. Inicia la cuenta atras de la sesion initCountDownSession
        UserGet: obtiene usuario del localStorage
        UserRefresh: se usa para cuando se hace un refresco de página (crtl + f5). UserGet and UserGuardar
        
