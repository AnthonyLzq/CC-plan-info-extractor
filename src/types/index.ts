interface IAnalyticContent {
  themes: string[]
  topic : string
}

interface ICourse {
  code: string
  name: string
}

interface IGeneralInfo {
  condition       : string
  course          : ICourse
  credits         : number
  evaluationSystem: string
  hoursPerWeek    : {
    laboratory: number
    theory    : number
    total     : number
  }
  preRequirements: ICourse
}

interface ISyllabusCourse {
  analyticProgram: IAnalyticContent[]
  competencies   : string[]
  generalInfo    : IGeneralInfo
  sommelier      : string
}

export {
  IAnalyticContent,
  ISyllabusCourse
}
