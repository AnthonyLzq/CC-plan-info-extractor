interface IAnalyticContent {
  themes: string[] | null
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
  preRequirements: ICourse[] | null
}

interface ISyllabusCourse {
  analyticProgram: IAnalyticContent[]
  bibliography   : string[]
  competencies   : string[]
  generalInfo    : IGeneralInfo
  sommelier      : string
}

export {
  IAnalyticContent,
  ISyllabusCourse,
  ICourse
}
