import { redirect } from "next/navigation";

export default function Home() {
  const random =
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2);
  const randomString = random.substring(0, 20);
  return redirect(`/seller/account/register?session=${randomString}`);
}
