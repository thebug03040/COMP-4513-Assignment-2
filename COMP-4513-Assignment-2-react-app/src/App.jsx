import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";

import { AuthProvider } from "./context/AuthContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <DataProvider>
          <AppShell
            header={<Header />}
            footer={<Footer />}
            padding="md"
          >
            <AppRouter />
          </AppShell>
        </DataProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
}