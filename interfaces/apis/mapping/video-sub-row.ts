import { TResVideo } from '@interfaces/apis/videos.types'
import { TVideoSubRowType } from '@interfaces/types'
import { EViolationType } from '@interfaces/enums'


const mappingResVideoSubRow = (res: TResVideo.TVideoSummary[]) => {
  const tempRes = res
  let result: TVideoSubRowType[] = []
  if (tempRes.length > 0) {
    result = tempRes.map((value, index) => {
      let tempResult: TVideoSubRowType = {}
      tempResult.sceneNumber = index + 1
      tempResult.category = 'Content Video'
      tempResult.description =
        'Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes many tasks and responsibilities in the government.'

      let vioRand = Math.floor(Math.random() * 5) + 1
      if (vioRand > 2) tempResult.violationType = EViolationType.saudi
      else tempResult.violationType = EViolationType.religion
      return tempResult
    })
  }
  return result
}

export default mappingResVideoSubRow
