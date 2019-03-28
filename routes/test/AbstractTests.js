class AbstractTests {
  constructor (PORT, ROUTE) {
    if (this.constructor === AbstractTests) {
      // Error Type 1. AbstractTests class can not be constructed.
      throw new TypeError('Can not construct AbstractTests class.')
    }
    // else (called from child)
    // Check if all instance methods are implemented.
    if (this.runIndependently === AbstractTests.prototype.runIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method runIndependently.')
    }
    // if (this.runDependently === AbstractTests.prototype.runDependently) {
    //   // Error Type 4. Child has not implemented this abstract method.
    //   throw new TypeError('Please implement AbstractTests method runDependently.')
    // }
    if (this.postRequestIndependently === AbstractTests.prototype.postRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method postRequestIndependently.')
    }
    if (this.getRequestIndependently === AbstractTests.prototype.getRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method getRequestIndependently.')
    }
    if (this.putRequestIndependently === AbstractTests.prototype.putRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method putRequestIndependently.')
    }
    if (this.deleteRequestIndependently === AbstractTests.prototype.deleteRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method deleteRequestIndependently.')
    }
    // if (this.postRequestDependently === AbstractTests.prototype.postRequestDependently) {
    //   // Error Type 4. Child has not implemented this abstract method.
    //   throw new TypeError('Please implement AbstractTests method postRequestDependently.')
    // }
    // if (this.getRequestDependently === AbstractTests.prototype.getRequestDependently) {
    //   // Error Type 4. Child has not implemented this abstract method.
    //   throw new TypeError('Please implement AbstractTests method getRequestDependently.')
    // }
    // if (this.putRequestDependently === AbstractTests.prototype.putRequestDependently) {
    //   // Error Type 4. Child has not implemented this abstract method.
    //   throw new TypeError('Please implement AbstractTests method putRequestDependently.')
    // }
    // if (this.deleteRequestDependently === AbstractTests.prototype.deleteRequestDependently) {
    //   // Error Type 4. Child has not implemented this abstract method.
    //   throw new TypeError('Please implement AbstractTests method deleteRequestDependently.')
    // }

    this.base_url = `http://localhost:${PORT}/api${ROUTE}`
    this.sharedState = {}
    this.runIndependently = this.runIndependently.bind(this)
    // this.runDependently = this.runDependently.bind(this)
    this.postRequestIndependently = this.postRequestIndependently.bind(this)
    this.getRequestIndependently = this.getRequestIndependently.bind(this)
    this.putRequestIndependently = this.putRequestIndependently.bind(this)
    this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
    // this.postRequestDependently = this.postRequestDependently.bind(this)
    // this.getRequestDependently = this.getRequestDependently.bind(this)
    // this.putRequestDependently = this.putRequestDependently.bind(this)
    // this.deleteRequestDependently = this.deleteRequestDependently.bind(this)
  }

  // An abstract methods.
  runIndependently () {
    expect(1).toBe(1)
  }

  // runDependently () {
  //   expect(1).toBe(1)
  // }

  postRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.postRequestIndependently()`.
    throw new TypeError('Do not call abstract method postRequestIndependently from child.')
  }

  getRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.getRequestIndependently()`.
    throw new TypeError('Do not call abstract method getRequestIndependently from child.')
  }

  putRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.putRequestIndependently()`.
    throw new TypeError('Do not call abstract method putRequestIndependently from child.')
  }

  deleteRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.deleteRequestIndependently()`.
    throw new TypeError('Do not call abstract method deleteRequestIndependently from child.')
  }

  // postRequestDependently () {
  //   // Error Type 6. The child has implemented this method but also called `super.postRequestDependently()`.
  //   throw new TypeError('Do not call abstract method postRequestDependently from child.')
  // }

  // getRequestDependently () {
  //   // Error Type 6. The child has implemented this method but also called `super.getRequestDependently()`.
  //   throw new TypeError('Do not call abstract method getRequestDependently from child.')
  // }

  // putRequestDependently () {
  //   // Error Type 6. The child has implemented this method but also called `super.putRequestDependently()`.
  //   throw new TypeError('Do not call abstract method putRequestDependently from child.')
  // }

  // deleteRequestDependently () {
  //   // Error Type 6. The child has implemented this method but also called `super.deleteRequestDependently()`.
  //   throw new TypeError('Do not call abstract method deleteRequestDependently from child.')
  // }
}
//= =---------------------------------------------------= =//

module.exports = AbstractTests
