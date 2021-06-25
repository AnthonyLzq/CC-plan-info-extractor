interface ICleanProps {
  positionEndSlice? : number
  positionStartSlice: number
  text              : string
}

const cleanGeneralInfo = ({
  text,
  positionStartSlice,
  positionEndSlice
}: ICleanProps): string => {
  if (positionEndSlice)
    text = text.slice(positionStartSlice, positionEndSlice)
  else
    text = text.slice(positionStartSlice)

  return text
    .replace(/:/g, '')
    .trim()
    .replace(/  +/g, ' ')
}

export { cleanGeneralInfo }
