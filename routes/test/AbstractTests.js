class AbstractTests {
  constructor (PORT, ROUTE) {
   
    this.base_url = `http://localhost:${PORT}/api${ROUTE}`
    this.projects_url = `http://localhost:${PORT}/api/projects`
    this.sharedState = {}
    this.run = this.run .bind(this)
    
  }

  // An abstract methods.
  run () {
    expect(1).toBe(1)
  }

 
}

module.exports = AbstractTests
