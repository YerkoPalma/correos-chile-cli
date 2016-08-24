import test from 'ava'
import execa from 'execa'

test(t => {
  // should get correct info
  return execa.shell('node ./cli.js RS458239104NL').then(result => {
    t.truthy(result.stdout.indexOf('✔') > 0)
  }).catch(e => {
    console.log(e)
  })
})
test(t => {
  // should get correct info
  return execa.shell('node ./cli.js will-fail').then(result => {
    t.truthy(result.stdout.indexOf('✖') > 0)
  }).catch(e => {
    console.log(e)
  })
})
