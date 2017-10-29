var DebugCleaner = require('../main.js')

describe('Debug Cleaner Instantiation', function() {
  it('instantiates itself with the js preset', function() {
    expect(function() {
      var cleaner = new DebugCleaner('js')
    }).not.toThrowError()
  })

  it('instantiates itself with the php preset', function() {
    expect(function() {
      var cleaner = new DebugCleaner('php')
    }).not.toThrowError()
  })

  it('instantiates itself with both presets', function() {
    expect(function() {
      var cleaner = new DebugCleaner(['js', 'php'])
    }).not.toThrowError()
  })

  it('fails to instantiate itself with an unknown preset', function() {
    expect(function() {
      var cleaner = new DebugCleaner('notapreset')
    }).toThrowError()
  })

  it('fails to instantiate itself with an empty array', function() {
    expect(function() {
      var cleaner = new DebugCleaner([])
    }).toThrowError()
  })
})
