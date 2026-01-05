import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      home: "Home",
      findWorkers: "Find Workers",
      workerDashboard: "My Dashboard",
      employerDashboard: "Employer Dashboard",
      skills: "Skills",
      wage: "Wage",
      availability: "Availability",
      available: "Available",
      busy: "Busy",
      contact: "Contact",
      // ... more translations
    },
    hi: {
      home: "होम",
      findWorkers: "श्रमिक खोजें",
      workerDashboard: "मेरा डैशबोर्ड",
      employerDashboard: "नियोक्ता डैशबोर्ड",
      skills: "कौशल",
      wage: "मजदूरी",
      availability: "उपलब्धता",
      available: "उपलब्ध",
      busy: "व्यस्त",
      contact: "संपर्क करें",
      // ... more translations
    },
    bn: {
      home: "হোম",
      findWorkers: "শ্রমিক খুঁজুন",
      workerDashboard: "আমার ড্যাশবোর্ড",
      employerDashboard: "নিয়োগকর্তা ড্যাশবোর্ড",
      // ... more translations
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
