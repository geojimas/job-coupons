import dayjs from 'dayjs'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(dayjs)
})
