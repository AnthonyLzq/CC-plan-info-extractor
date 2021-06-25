import { PDFExtract, PDFExtractOptions, PDFExtractResult } from 'pdf.js-extract'

import { ISyllabusCourse } from './types'
import { cleanGeneralInfo } from './utils'

// Key words from the syllabus main page
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
const options: PDFExtractOptions = {
  firstPage: 18,
  lastPage : 21
}

// const fullContent: ISyllabusCourse[] = []

const extractData = async () => {
  try {
    const data: PDFExtractResult = await pdfExtract.extract(
      `${__dirname}/plans/cc_plan_2018.pdf`,
      options
    )
    const { pages } = data

    pages.forEach(({ content }) => {
      const currentText: string[] = []

      content.forEach(text => {
        if (text.str !== '' && text.str !== ' ')
          currentText.push(text.str)
      })

      const isTheFirstPage = currentText.indexOf(SYLLABUS) !== -1
      const pageContent: ISyllabusCourse = {
        analyticProgram: [],
        competencies   : [],
        generalInfo    : {
          condition: '',
          course   : {
            code: '',
            name: ''
          },
          credits         : 0,
          evaluationSystem: '',
          hoursPerWeek    : {
            laboratory: 0,
            theory    : 0,
            total     : 0
          },
          preRequirements: {
            code: '',
            name: ''
          }
        },
        sommelier: ''
      }

      if (isTheFirstPage) {
        // Removing everything before the syllabus
        const positionOfSyllabus = currentText.indexOf(SYLLABUS)
        currentText.splice(0, positionOfSyllabus + 1)

        // Removing "Información General"
        const positionOfGeneralInfo = currentText.indexOf(GENERAL_INFO)
        currentText.splice(0, positionOfGeneralInfo + 1)

        // Saving the sommelier
        let positionOfSommelier = currentText.indexOf(SOMMELIER)

        // Saving general info and replacing REQUIREMENTS by REQUIREMENT in case
        // the present word is REQUIREMENTS
        const generalInfo = currentText
          .splice(0, positionOfSommelier)
          .join(' ')
          .replace(`${REQUIREMENT}S`, REQUIREMENT)
        const preRequirements = cleanGeneralInfo({
          positionEndSlice  : generalInfo.indexOf(CONDITION),
          positionStartSlice: generalInfo
            .indexOf(PRE_REQUIREMENTS) + PRE_REQUIREMENTS.length,
          text: generalInfo
        })
        const hoursPerWeek = cleanGeneralInfo({
          positionEndSlice  : generalInfo.indexOf(EVALUATION_SYSTEM),
          positionStartSlice: generalInfo
            .indexOf(HOURS_PER_WEEK) + HOURS_PER_WEEK.length,
          text: generalInfo
        })
        pageContent.generalInfo = {
          ...pageContent.generalInfo,
          condition: cleanGeneralInfo({
            positionEndSlice  : generalInfo.indexOf(HOURS_PER_WEEK),
            positionStartSlice: generalInfo
              .indexOf(CONDITION) + CONDITION.length,
            text: generalInfo
          }),
          course: {
            code: cleanGeneralInfo({
              positionEndSlice  : generalInfo.indexOf(CREDITS),
              positionStartSlice: generalInfo.indexOf(CODE) + CODE.length,
              text              : generalInfo
            }).replace(' ', ''),
            name: cleanGeneralInfo({
              positionEndSlice  : generalInfo.indexOf(CODE),
              positionStartSlice: generalInfo.indexOf(COURSE) + COURSE.length,
              text              : generalInfo
            })
          },
          credits: parseInt(
            cleanGeneralInfo({
              positionEndSlice  : generalInfo.indexOf(PRE_REQUIREMENTS),
              positionStartSlice: generalInfo.indexOf(CREDITS) + CREDITS.length,
              text              : generalInfo
            }
          )),
          evaluationSystem: cleanGeneralInfo({
            positionStartSlice: generalInfo
              .indexOf(EVALUATION_SYSTEM) + EVALUATION_SYSTEM.length,
            text: generalInfo
          }),
          hoursPerWeek: {
            laboratory: parseInt(
              hoursPerWeek
                .slice(
                  hoursPerWeek.indexOf(LABORATORY) + LABORATORY.length,
                  hoursPerWeek.indexOf(')')
                )
                .replace('0', '')
                .replace(/ /g, '')
            ),
            theory: parseInt(
              hoursPerWeek
                .slice(
                  hoursPerWeek.indexOf(THEORY) + THEORY.length,
                  hoursPerWeek.indexOf(',')
                )
                .replace('0', '')
                .replace(/ /g, '')
            ),
            total: parseInt(
              hoursPerWeek
                .slice(0, hoursPerWeek.indexOf('('))
                .replace('0', '')
                .replace(/ /g, '')
            )
          },
          preRequirements: {
            code: preRequirements.slice(0, preRequirements.indexOf(' –')),
            name: preRequirements.slice(preRequirements.indexOf('– ') + 2)
          }
        }

        // Updating sommelier position after splice
        positionOfSommelier = currentText.indexOf(SOMMELIER)

        // Removing "Sumilla"
        currentText.splice(0, positionOfSommelier + 1)
        let positionOfCompetencies = currentText.indexOf(COMPETENCIES)

        // Verifying if the competencies are in this page
        if (positionOfCompetencies !== -1) {
          // Saving sommelier
          pageContent.sommelier = currentText
            .splice(0, positionOfCompetencies)
            .join(' ')
            .replace(/  +/g, ' ')
            .trim()
          // Updating competencies position
          positionOfCompetencies = currentText.indexOf(COMPETENCIES)
          // Removing "Competencias" and the first bullet
          currentText.splice(0, positionOfCompetencies + 2)

          // If the competencies are still here, I save them
          if (currentText.length > 0) {
            let competence = ''
            currentText.forEach((e, index, arr) => {
              if (e !== BULLET) {
                competence += e
                if (index === arr.length - 1)
                  pageContent.competencies.push(
                    competence.replace(/  +/g, ' ').trim()
                  )
              } else {
                pageContent.competencies.push(
                  competence.replace(/  +/g, ' ').trim()
                )
                competence = ''
              }
            })
          }
        } else
          pageContent.sommelier = currentText.splice(0).join(' ')

        console.log(JSON.stringify(pageContent, null, 2))
      }
    })
  } catch (error) {
    console.error(error)
  }
}

extractData()
