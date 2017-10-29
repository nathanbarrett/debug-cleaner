import IChecker from './IChecker'
import IDefaultCheckers from './IDefaultCheckers'

export default interface IDebugCleaner {
  checkers: IChecker[]
  defaultCheckers: IDefaultCheckers
  check(): string
}
