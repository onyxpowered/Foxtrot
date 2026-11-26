import { useParams } from "react-router-dom";

export function Profile() {
  const { username } = useParams();
  return (
    <main>
      <h1>{username}</h1>
    </main>
  );
}
