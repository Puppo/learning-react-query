import { PropsWithChildren } from "react";
import { useSignOut } from "../../auth/useSignOut";
import { useUser } from "../../auth/useUser";
import { AppBar } from "../../components";

export default function (
  { children }: PropsWithChildren
) {
  const { user } = useUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut()
  }

  return <>
    <AppBar
      auth={!!user}
      logout={handleLogout}
    />
    {children}
  </>
}