import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Card } from "./components/ui";
import { supabaseConfigured } from "./lib/supabase";
import Login from "./pages/Login";
import PropertiesList from "./pages/PropertiesList";
import PropertyEditor from "./pages/PropertyEditor";
import CollectionList from "./pages/CollectionList";
import CollectionEditor from "./pages/CollectionEditor";
import SubmissionsInbox from "./pages/SubmissionsInbox";
import SiteContentList from "./pages/SiteContentList";
import SiteContentEditor from "./pages/SiteContentEditor";

export default function App() {
  if (!supabaseConfigured) {
    return <ConfigError />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<PropertiesList />} />
              <Route path="/properties/new" element={<PropertyEditor />} />
              <Route path="/properties/:id" element={<PropertyEditor />} />

              <Route path="/c/:slug" element={<CollectionList />} />
              <Route path="/c/:slug/new" element={<CollectionEditor />} />
              <Route path="/c/:slug/:id" element={<CollectionEditor />} />

              <Route path="/inbox/:slug" element={<SubmissionsInbox />} />

              <Route path="/content" element={<SiteContentList />} />
              <Route path="/content/new" element={<SiteContentEditor />} />
              <Route path="/content/:key" element={<SiteContentEditor />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function ConfigError() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Card className="max-w-md">
        <h1 className="text-lg font-semibold">Supabase is not configured</h1>
        <p className="mt-2 text-sm text-muted">
          Create a <code className="text-purple-light">.env.local</code> file in the{" "}
          <code className="text-purple-light">cms/</code> folder with{" "}
          <code className="text-purple-light">VITE_SUPABASE_URL</code> and{" "}
          <code className="text-purple-light">VITE_SUPABASE_ANON_KEY</code>, then restart the
          dev server. See <code className="text-purple-light">.env.example</code>.
        </p>
      </Card>
    </div>
  );
}
