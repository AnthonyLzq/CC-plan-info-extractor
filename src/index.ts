import { PDFExtract, PDFExtractOptions, PDFExtractResult } from 'pdf.js-extract'

import { ICourse, ISyllabusCourse } from './types'
import { cleanGeneralInfo } from './utils'

// Key words from the syllabus main page
const UNI = process.env.UNI as string
const NONE = process.env.NONE as string
const SYLLABUS = process.env.SYLLABUS as string
const GENERAL_INFO = process.env.GENERAL_INFO as string
const SOMMELIER = process.env.SOMMELIER as string
const COMPETENCIES = process.env.COMPETENCIES as string
const BULLET = process.env.BULLET as string

// Key words from the general info
const COURSE = process.env.COURSE as string
const CODE = process.env.CODE as string
const CREDITS = process.env.CREDITS as string
const PRE_REQUIREMENTS = process.env.PRE_REQUIREMENTS as string
const CONDITION = process.env.CONDITION as string
const HOURS_PER_WEEK = process.env.HOURS_PER_WEEK as string
const EVALUATION_SYSTEM = process.env.EVALUATION_SYSTEM as string
const REQUIREMENT = process.env.REQUIREMENT as string
const THEORY = process.env.THEORY as string
const LABORATORY = process.env.LABORATORY as string

const pdfExtract = new PDFExtract()
const options: PDFExtractOptions = {}

// const fullContent: ISyllabusCourse[] = []

const extractData = async () => {
  try {
    const data: PDFExtractResult = await pdfExtract.extract(
      `${__dirname}/plans/cc_plan_2018.pdf`,
      options
    )
    const { pages } = data

    let planContent = ''
    pages.forEach(({ content }) => {
      content.forEach(text => {
        if (text.str !== '' && text.str !== ' ')
        planContent += text.str
      })
    })

    const courseContentArray = planContent.split(UNI)
    courseContentArray.shift()

    courseContentArray.forEach(courseContent => {
      const courseName = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(CODE),
        positionStartSlice: courseContent.indexOf(COURSE) + COURSE.length,
        text              : courseContent
      })
      const courseCode = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(CREDITS),
        positionStartSlice: courseContent.indexOf(CODE) + CODE.length,
        text              : courseContent
      })
      const credits = parseInt(
        cleanGeneralInfo({
          positionEndSlice  : courseContent.indexOf('('),
          positionStartSlice: courseContent.indexOf(CREDITS) + CREDITS.length,
          text              : courseContent
        }).trim()
      )
      let preRequirementsAux = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(CONDITION),
        positionStartSlice: courseContent
          .indexOf(PRE_REQUIREMENTS) + PRE_REQUIREMENTS.length,
        text: courseContent
      })
      let preRequirements: string[] | null = null
      let finalPreRequirements: ICourse[] | null = null

      if (!preRequirementsAux.includes(NONE)) {
        if (preRequirementsAux[0] === '-')
          preRequirementsAux = preRequirementsAux.slice(1)

        preRequirements = preRequirementsAux
          .replace(/ - /g, '/')
          .split('-')

        const auxFinalPreRequirements: ICourse[] = []

        preRequirements.forEach(preRequirement => {
          const aux = preRequirement.split('/')

          auxFinalPreRequirements.push({
            code: aux[0],
            name: aux[1]
          })
        })

        finalPreRequirements = auxFinalPreRequirements
      }

      console.log({
        courseCode,
        courseName,
        credits,
        preRequirements: finalPreRequirements
      })
    })

    // console.log({ courseContentArray: courseContentArray.splice(0, 3) })
  } catch (error) {
    console.error(error)
  }
}

extractData()
