import { RuntimePage } from "./pages/RuntimePage";

export default function App() {
  const runtimeId = window.location.pathname.replace("/runtime/", "").split("/")[0];
  return <RuntimePage runtimeId={runtimeId} />;
}
