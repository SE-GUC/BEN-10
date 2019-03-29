class AbstractTests {
  constructor (PORT, ROUTE) {
    if (this.constructor === AbstractTests) {
      // Error Type 1. AbstractTests class can not be constructed.
      throw new TypeError('Can not construct AbstractTests class.')
    }
    // Check if all instance methods are implemented.
    if (this.run === AbstractTests.prototype.run ) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method run .')
    }
    
    if (this.postRequest === AbstractTests.prototype.postRequest ) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method postRequest .')
    }
    if (this.getRequest === AbstractTests.prototype.getRequest ) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method getRequest .')
    }
    if (this.putRequest === AbstractTests.prototype.putRequest ) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method putRequest .')
    }
    if (this.deleteRequest === AbstractTests.prototype.deleteRequest ) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method deleteRequest .')
    }

    this.base_url = `http://localhost:${PORT}/api${ROUTE}`
    this.projects_url = "http://localhost:3000/api/projects"
    this.sharedState = {}
    this.run = this.run .bind(this)
    this.postRequest = this.postRequest.bind(this)
    this.getRequest = this.getRequest.bind(this)
    this.putRequest = this.putRequest.bind(this)
    this.deleteRequest = this.deleteRequest.bind(this)
  }

  // An abstract methods.
  run () {
    expect(1).toBe(1)
  }

  postRequest () {
    // Error Type 6. The child has implemented this method but also called `super.postRequest ()`.
    throw new TypeError('Do not call abstract method postRequest from child.')
  }

  getRequest () {
    // Error Type 6. The child has implemented this method but also called `super.getRequest ()`.
    throw new TypeError('Do not call abstract method getRequest from child.')
  }

  putRequest () {
    // Error Type 6. The child has implemented this method but also called `super.putRequest ()`.
    throw new TypeError('Do not call abstract method putRequest from child.')
  }

  deleteRequest () {
    // Error Type 6. The child has implemented this method but also called `super.deleteRequest ()`.
    throw new TypeError('Do not call abstract method deleteRequest from child.')
  }
}

module.exports = AbstractTests
