/* eslint-disable sort-keys-fix/sort-keys-fix, sort-keys */
import fs from 'fs'
import { PDFExtract, PDFExtractOptions, PDFExtractResult } from 'pdf.js-extract'
import cliProgress from 'cli-progress'

import { firebaseConnection } from './database'
import { CustomNodeJSGlobal } from './global'
import { IAnalyticContent, ICourse, ISyllabusCourse } from './types'
import { cleanGeneralInfo, writeFile, cliOptions } from './utils'

declare const global: CustomNodeJSGlobal

// Key words from the syllabus main page
const UNI = process.env.UNI as string
const NONE = process.env.NONE as string
const SOMMELIER = process.env.SOMMELIER as string
const COMPETENCIES = process.env.COMPETENCIES as string
const ANALYTIC_PROGRAM = process.env.ANALYTIC_PROGRAM as string

// Key words from the general info
const COURSE = process.env.COURSE as string
const CODE = process.env.CODE as string
const CREDITS = process.env.CREDITS as string
const PRE_REQUIREMENTS = process.env.PRE_REQUIREMENTS as string
const CONDITION = process.env.CONDITION as string
const HOURS_PER_WEEK = process.env.HOURS_PER_WEEK as string
const EVALUATION_SYSTEM = process.env.EVALUATION_SYSTEM as string
const THEORY = process.env.THEORY as string
const LABORATORY = process.env.LABORATORY as string
const PRACTICE = process.env.PRACTICE as string
const BIBLIOGRAPHY = process.env.BIBLIOGRAPHY as string
const BULLET = process.env.BULLET as string

const planCleanedPath = `${__dirname}/results/plan2018.json`
const pdfExtract = new PDFExtract()
const options: PDFExtractOptions = {}
const fullContent: ISyllabusCourse[] = []

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
        })
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

      const condition = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(HOURS_PER_WEEK),
        positionStartSlice: courseContent.indexOf(CONDITION) + CONDITION.length,
        text              : courseContent
      })
      const totalHoursPerWeek = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(EVALUATION_SYSTEM),
        positionStartSlice: courseContent
          .indexOf(HOURS_PER_WEEK) + HOURS_PER_WEEK.length,
        text: courseContent
      })
      const hoursPerWeek = {
        total: parseInt(
          totalHoursPerWeek.slice(0, totalHoursPerWeek.indexOf('(')).trim()
        ),
        theory: parseInt(
          totalHoursPerWeek.slice(
            totalHoursPerWeek.indexOf(THEORY) + THEORY.length,
            totalHoursPerWeek.indexOf(THEORY) + THEORY.length + 3
          ).trim()
        ),
        laboratory: totalHoursPerWeek.indexOf(LABORATORY) !== -1
          ? parseInt(
            totalHoursPerWeek.slice(
              totalHoursPerWeek.indexOf(LABORATORY) + LABORATORY.length,
              totalHoursPerWeek.indexOf(LABORATORY) + LABORATORY.length + 3
            ).trim()
          )
          : null,
        practice: totalHoursPerWeek.indexOf(PRACTICE) !== -1
          ? parseInt(
            totalHoursPerWeek.slice(
              totalHoursPerWeek.indexOf(PRACTICE) + PRACTICE.length,
              totalHoursPerWeek.indexOf(PRACTICE) + PRACTICE.length + 3
            )
          )
          : null
      }
      const evaluationSystem = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(SOMMELIER),
        positionStartSlice: courseContent
          .indexOf(EVALUATION_SYSTEM) + EVALUATION_SYSTEM.length,
        text: courseContent
      })
      const sommelier = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(COMPETENCIES),
        positionStartSlice: courseContent.indexOf(SOMMELIER) + SOMMELIER.length,
        text              : courseContent
      })
      const competencies = cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(ANALYTIC_PROGRAM),
        positionStartSlice: courseContent
          .indexOf(COMPETENCIES) + COMPETENCIES.length,
        text: courseContent
      }).slice(1)
      const competenciesArray = competencies.split('-').map(c => c.trim())
      const analyticContent: IAnalyticContent[] = []
      cleanGeneralInfo({
        positionEndSlice  : courseContent.indexOf(BIBLIOGRAPHY),
        positionStartSlice: courseContent
          .indexOf(ANALYTIC_PROGRAM) + ANALYTIC_PROGRAM.length,
        text: courseContent
      })
      .split(/(\d+\.)/)
      .slice(1)
      .reduce<string[][]>((acc, e) => {
        if (!e.match(/(\d\.)/))
          acc.push(e.trim().split(/\w\./).map(v => v.trim()))

        return acc
      }, [])
      .forEach(e => {
        const topic = e[0].replace(/2, /g, '2.')
        const themes = e
          .filter((t, index) => index !== 0)
          .map(v => v
            .replace(/802\//g, '802.')
            .replace(/2, /g, '2.')
            .replace(/etc/g, 'etc.')
          )

        analyticContent.push({
          themes,
          topic
        })
      })

      const bibliography = cleanGeneralInfo({
        positionStartSlice: courseContent
          .indexOf(BIBLIOGRAPHY) + BIBLIOGRAPHY.length,
        text: courseContent
      }).split(BULLET).slice(1)

      const generalInfo = {
        course: {
          code: courseCode,
          name: courseName
        },
        credits,
        preRequirements: finalPreRequirements,
        condition,
        hoursPerWeek,
        evaluationSystem
      }

      fullContent.push({
        generalInfo,
        sommelier,
        competencies   : competenciesArray[0] === '' ? []: competenciesArray,
        analyticProgram: analyticContent,
        bibliography   : bibliography.map(e => ({
          category: 'book',
          name    : e.trim(),
          rates   : 0,
          rating  : 0
        }))
      })
    })

    const result = await writeFile(
      JSON.stringify(fullContent, null, 2),
      planCleanedPath
    )
    console.log({ result })
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  if (fs.existsSync(planCleanedPath))
    try {
      await firebaseConnection()
      let i = 0
      const bar = new cliProgress.SingleBar(
        cliOptions,
        cliProgress.Presets.shades_classic
      )
      const { default: plan } = await import(planCleanedPath)
      const fullSyllabus: ISyllabusCourse[] = plan
      bar.start(fullSyllabus.length, i)
      const collectionRef = global.firestoreDB.collection('syllabus')
      await Promise.all(fullSyllabus.map((s, index) => {
        i = index
        bar.update(i + 1)

        return collectionRef.doc(s.generalInfo.course.code).set(s)
      }))
      bar.update(i + 1)
      bar.stop()
    } catch (e) {
      console.log('\n')
      console.error(e)
    }
  else extractData()
}

main()
