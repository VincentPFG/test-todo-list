import { db } from './../db'
import { redirect } from 'remix'

export default () => (
  <div>
    <form method='post'>
      <input type='text' name='task' />
    </form>
  </div>
)

export const action = async ({ request }) => {
  const fData = await request.formData()
  console.log(fData.get('task'))
  await db.item.create({
    data: { text: fData.get('task') },
  })
  return redirect(request.url)
}
