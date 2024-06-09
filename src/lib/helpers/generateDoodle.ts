interface Props {
      length: number,
      values?: Array<string>
}
export const generateDoodles = ({
      length, 
      values=["/images/green-doodle.png", "/images/orange-doodle.png"]
} : Props): Array<string> => {
      if(typeof length !== "number" || length < 0) throw new TypeError('Length must be a non-negative number')
      if(!Number.isSafeInteger(length)) throw new RangeError('Length must be a safe integer')

      return Array.from({length}, ()=> values[Math.floor(Math.random() * values.length)])
}