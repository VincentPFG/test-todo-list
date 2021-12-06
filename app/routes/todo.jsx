import { db } from './../db'
import { redirect } from 'remix'
import { useLoaderData } from 'remix'

export default () => {
  const list = useLoaderData()
  return (
    <div>
      <form method='post'>
        <input type='text' name='task' />
      </form>
      <hr />
      <ul>
        {list.map(({ text }) => (
          <li>{text}</li>
        ))}
      </ul>
    </div>
  )
}

export const action = async ({ request }) => {
  const fData = await request.formData()
  console.log(fData.get('task'))
  await db.item.create({
    data: { text: fData.get('task') },
  })
  return redirect(request.url)
}

export const loader = async ({}) =>
  await db.item.findMany()
