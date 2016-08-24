# correos-chile-cli [![Build Status](https://travis-ci.org/YerkoPalma/correos-chile-cli.svg?branch=master)](https://travis-ci.org/YerkoPalma/correos-chile-cli)

> Obtiene el seguimiento de uno o más paquetes de Correos de Chile


## Instalación

```
$ npm install --global correos-chile-cli
```


## Uso

```
$ correos --help

  Uso
    $ correos <[códigos]>

  Opciones
    --simple, -s        No incluye el detalle de registros

  Ejemplos
    $ correos RS458239104NL
    √   RS458239104NL
    General
        Envio:          999042472463
        Entregado a:    jose urzua
        Fecha Entrega:  01/08/2016 13:28
        Rut:            9.999.999-3

    Registros
        ┌───────────────────────────┬──────────────────┬───────────────┐
        │ estado                    │ fecha            │ lugar         │
        │───────────────────────────┼──────────────────┼───────────────│
        │ ENVIO ENTREGADO           │ 01/08/2016 13:28 │ PLANTA CEP RM │
        │───────────────────────────┼──────────────────┼───────────────│
        │ ENVIO EN REPARTO          │ 01/08/2016 9:46  │ PLANTA CEP RM │
        │───────────────────────────┼──────────────────┼───────────────│
        │ RECIBIDO EN PLANTA ORIGEN │ 30/07/2016 2:24  │ PLANTA CEP RM │
        └───────────────────────────┴──────────────────┴───────────────┘

    $ correos codigoFalso RS458239104NL
    ✖   codigoFalso
        No se encontraron registros para este paquete 
```


## Relacionado

- [correos-chile](https://github.com/josemontesp/correos-chile-npm) - API para este modulo


## Licencia

MIT © [Yerko Palma](https://github.com/YerkoPalma)