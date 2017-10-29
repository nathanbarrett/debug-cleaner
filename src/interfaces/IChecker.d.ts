export default interface IChecker {
  extentions: string[]
  checkFor: Array<RegExp | string>
  errorWhenFound?: boolean
  changedGitFiles?: boolean
  stagedGitFiles?: boolean
  verbosity?: number
  paths?: string[]
  name?: string
}
