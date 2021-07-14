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
    laboratory: number | null
    practice  : number | null
    theory    : number
    total     : number
  }
  preRequirements: ICourse[] | null
}

interface IBibliographyAndRating {
  name  : string
  rating: number
}

interface ISyllabusCourse {
  analyticProgram?: IAnalyticContent[]
  bibliography?   : IBibliographyAndRating[]
  competencies?   : string[]
  generalInfo     : IGeneralInfo
  sommelier       : string
}

interface IFirebaseConfig {
  auth_provider_x509_cert_url: string
  auth_uri                   : string
  client_email               : string
  client_id                  : string
  client_x509_cert_url       : string
  private_key                : string
  private_key_id             : string
  project_id                 : string
  token_uri                  : string
  type                       : string
}

export {
  IAnalyticContent,
  ISyllabusCourse,
  ICourse,
  IFirebaseConfig
}
