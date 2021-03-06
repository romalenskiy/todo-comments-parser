const chai = require('chai')
const path = require('path')
const child = require('child_process')

const { expect } = chai
let proc
const exec = path.join(__dirname, '../../src', 'index.js')


describe('Команда important', () => {
  before(() => {
    process.chdir(__dirname)
  })

  beforeEach(() => {
    proc = child.exec(`node ${exec}`)
  })

  it('должен показывать список todo с восклицательными знаками', (done) => {
    const result = `
  !  |  user      |  date        |  comment              |  fileName       
---------------------------------------------------------------------------
  !  |            |              |  Hi!                  |  jsWithTodo.js  
  !  |  Veronika  |  2018-12-25  |  С Наступающим 2019!  |  jsWithTodo.js  
  !  |  pe        |  2018-12-26  |  Работать пора!!!     |  jsWithTodo.js  
---------------------------------------------------------------------------
`.trim()

    proc.stdout.once('data', () => {
      proc.stdin.write('important\r')
      proc.stdout.once('data', (output) => {
        expect(output.toString('utf-8').trim()).to.eq(result)
        done()
      })
    })
  })
})
