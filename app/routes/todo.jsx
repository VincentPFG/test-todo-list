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
        {list.map(({ text, id }) => (
          <li>
            {text}
            <form method='post'>
              <input
                type='hidden'
                name='toDelete'
                value={id}
              />
              <button type='submit'>Done</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const action = async ({ request }) => {
  const fData = await request.formData()

  const task = fData.get('task')
  if (task)
    await db.item.create({
      data: { text: fData.get('task') },
    })

  const toDelete = fData.get('toDelete')
  if (toDelete)
    await db.item.delete({
      where: { id: parseInt(toDelete) },
    })

  return redirect(request.url)
}

export const loader = async () =>
  await db.item.findMany()
