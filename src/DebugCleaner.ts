import { isArray, isRegExp, has } from 'lodash'
import IDebugCleaner from './interfaces/IDebugCleaner'
import IChecker from './interfaces/IChecker'
import IDefaultCheckers from './interfaces/IDefaultCheckers'

class DebugCleaner implements IDebugCleaner {
  checkers: IChecker[]

  defaultCheckers: IDefaultCheckers = {
    js: {
      extentions: ['.js'],
      checkFor: [new RegExp(/console\.log/g), new RegExp(/debugger/)],
      name: 'Javascript'
    },
    php: {
      extentions: ['.php'],
      checkFor: [new RegExp(/(^dd\(.*\)|[^\S]dd\(.*\))/g), new RegExp(/var_dump\(.*\)/g)],
      name: 'PHP'
    }
  }

  constructor(options: any) {
    if (!options) {
      throw new Error('Debug cleaner must be instantiated with options')
    }
    if (isArray(options)) {
      if (options.length === 0) {
        throw new Error('Debug cleaner options array is empty')
      }
      this.checkers = options.map(option => {
        if (typeof option === 'string') {
          return this.generateDefaultChecker(<string>option)
        } else if (typeof option === 'object') {
          return this.generateChecker(<IChecker>option)
        }
        throw new Error('Invalid option given in array')
      })
      return this
    }
    if (typeof options === 'object' && options.extentions) {
      this.checkers = [this.generateChecker(<IChecker>options)]
      return this
    }
    if (typeof options === 'string') {
      this.checkers = [this.generateDefaultChecker(<string>options)]
      return this
    }
    throw new Error('Invalid options given')
  }

  public check(): string {
    if (!this.checkers) {
      throw new Error('Debug Cleaner must be instantiated with options first')
    }
    this.checkers.forEach(checker => {
      //TODO start checking for files
    })
    return 'checked!'
  }

  private generateDefaultChecker(extention: string): IChecker {
    if (!has(this.defaultCheckers, extention)) {
      throw new Error('Undefined default found')
    }
    let checker = this.defaultCheckers[extention]
    return this.mergeWithOptionalDefaults(checker)
  }

  private generateChecker(checker: IChecker): IChecker {
    if (!has(checker, 'extentions')) {
      throw new Error('Your checker is missing extentions')
    }
    if (!has(checker, 'checkFor')) {
      throw new Error('Your checker is missing required checkFor field')
    }
    if (typeof checker.extentions === 'string') {
      checker.extentions = [checker.extentions]
    }
    if (!isArray(checker.checkFor)) {
      checker.checkFor = [checker.checkFor]
    }
    return this.mergeWithOptionalDefaults(checker)
  }

  private mergeWithOptionalDefaults(checker: IChecker): IChecker {
    return {
      errorWhenFound: true,
      stagedGitFiles: false,
      changedGitFiles: true,
      verbosity: 1,
      paths: [],
      ...checker
    }
  }
}

export = DebugCleaner
