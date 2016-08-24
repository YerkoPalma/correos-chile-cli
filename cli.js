#!/usr/bin/env node
'use strict'

const correos = require('correos-chile')
const meow = require('meow')
const logSymbols = require('log-symbols')
const Table = require('cli-table')

let table = new Table({
  head: ['Estado', 'Fecha', 'Lugar']
})
table.push(
  ['ENVIO ENTREGADO', '01/08/2016 13:28', 'PLANTA CEP RM'],
  ['ENVIO EN REPARTO', '01/08/2016 9:46', 'PLANTA CEP RM'],
  ['RECIBIDO EN PLANTA ORIGEN', '30/07/2016 2:24', 'PLANTA CEP RM']
)

const cli = meow(`
    Uso
    $ correos <[códigos]>

    Opciones
    --simple, -s        No incluye el detalle de registros

    Ejemplos
    $ correos RS458239104NL
    ${logSymbols.success}   RS458239104NL
    General
        Envio:          999042472463
        Entregado a:    jose urzua
        Fecha Entrega:  01/08/2016 13:28
        Rut:            9.999.999-3

    Registros
${table.toString()}

    $ correos codigoFalso
    ${logSymbols.error}   codigoFalso
        No se encontraron registros para este paquete
`, {
  alias: {
    s: 'simple'
  }
})

if (cli.input.length === 0) {
  cli.showHelp()
}
correos(cli.input).then(results => {
  results.forEach((result, i) => {
    let detail = result.registros
    const general = result.datosgenerales
    if (general) {
      if (detail && !cli.flags.simple) {
        detail = detail.map(reg => {
          return [reg.estado, reg.fecha, reg.lugar]
        })
        let table = new Table({
          head: ['Estado', 'Fecha', 'Lugar']
        })
        table.push.apply(table, detail)
      }
      console.log(`
      ${logSymbols.success}   ${cli.input[i]}
      General
          Envio:          ${general.Envio}
          Entregado a:    ${general.Entregado_a}
          Fecha Entrega:  ${general.Fecha_Entrega}
          Rut:            ${general.Rut}`)
      if (!cli.flags.simple) {
        console.log(`
        Registros
${table.toString()}
        `)
      }
    } else {
      console.log(`
      ${logSymbols.error}   ${cli.input[i]}

          No se encontraron registros para este paquete
      `)
    }
  })
}).catch(e => {
  console.log(`
    ${logSymbols.error}   ${e.message}

    ${e.stack}
  `)
  process.exit(1)
})
