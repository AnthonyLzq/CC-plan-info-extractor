interface IAnalyticContent {
  themes: string[]
  topic : string
}

interface ISyllabusCourse {
  analyticProgram: IAnalyticContent[]
  competencies   : string[]
  generalInfo    : string
  sommelier      : string
}

export {
  IAnalyticContent,
  ISyllabusCourse
}
