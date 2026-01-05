import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, User, Building2, Menu, X, LogOut, LogIn } from "lucide-react";
import { User as UserEntity } from "@/entities/all";
import { useLanguage, LanguageProvider } from "./components/language/LanguageProvider";
import LanguageSwitcher from "./components/language/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import VoiceNavigator from "./components/voice/VoiceNavigator";

function LayoutContent({ children, currentPageName }) {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const navigationItems = [
    { title: t('home'), icon: Home, href: createPageUrl('Home'), key: 'home' },
    { title: t('findWorkers'), icon: Search, href: createPageUrl('SearchWorkers'), key: 'search' },
    // ... more items
  ];

  const checkAuthStatus = async () => {
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogin = async () => {
    try {
      await UserEntity.login();
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await UserEntity.logout();
      setUser(null);
      window.location.href = createPageUrl("Landing");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ... render JSX with header, navigation, footer
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </LanguageProvider>
  );
}

