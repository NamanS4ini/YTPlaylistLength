import { redirect } from 'next/navigation'

export default function DetailsUrlPage({ params }: { params: { url: string } }) {
  redirect(`/${params.url}`)
}
