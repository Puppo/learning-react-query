import { PropsWithChildren } from "react";
import { AppBar } from "../../components";

export default function (
  { children }: PropsWithChildren
) {
  const auth = false;

  const handleLogout = () => {
    // TODO handle logout
  }

  return <>
    <AppBar
      auth={auth}
      logout={handleLogout}
    />
    {children}
  </>
}