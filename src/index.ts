import { PDFExtract, PDFExtractOptions, PDFExtractResult } from 'pdf.js-extract'

import { ISyllabusCourse } from './types'

const SYLLABUS = process.env.SYLLABUS as string
const GENERAL_INFO = process.env.GENERAL_INFO as string
const SOMMELIER = process.env.SOMMELIER as string
const COMPETENCIES = process.env.COMPETENCIES as string
const BULLET = process.env.BULLET as string

const pdfExtract = new PDFExtract()
const options: PDFExtractOptions = {
  firstPage: 18,
  lastPage : 18
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
        generalInfo    : '',
        sommelier      : ''
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
        pageContent.generalInfo = currentText
          .splice(0, positionOfSommelier)
          .join(' ')
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
          // Updating competencies position
          positionOfCompetencies = currentText.indexOf(COMPETENCIES)
          // Removing "Competencias" and the first bullet
          currentText.splice(0, positionOfCompetencies + 2)

          // If the competencies are still here, I save them
          if (currentText.length > 0) {
            let competence = ''
            currentText.forEach(e => {
              if (e !== BULLET)
                competence += e
              else {
                pageContent.competencies.push(
                  competence.replace(/  +/g, ' ').trim()
                )
                competence = ''
              }
            })
          }
        } else
          pageContent.sommelier = currentText.splice(0).join(' ')

        console.log({ pageContent })
      }
    })
  } catch (error) {
    console.error(error)
  }
}

extractData()
