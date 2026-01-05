import React, { useState, useCallback } from "react";
import { useLanguage } from "../language/LanguageProvider";
import { useVoiceHelper } from "./VoiceHelper";
import { createPageUrl } from "@/utils";

export default function VoiceNavigator() {
  const [isListening, setIsListening] = useState(false);
  const { language } = useLanguage();
  const { speak } = useVoiceHelper();

  const startListening = useCallback(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-BD' : 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      processCommand(transcript);
    };
    
    recognition.start();
    setIsListening(true);
  }, [language]);

  const processCommand = useCallback((command) => {
    const commands = {
      'home': () => window.location.href = createPageUrl('Home'),
      'search': () => window.location.href = createPageUrl('SearchWorkers'),
      'dashboard': () => window.location.href = createPageUrl('WorkerDashboard'),
      'employer': () => window.location.href = createPageUrl('EmployerDashboard'),
      'help': () => showHelp()
    };

    // Hindi commands
    const hindiCommands = {
      'होम पर जाओ': commands.home,
      'मजदूर खोजो': commands.search,
      'मेरा डैशबोर्ड': commands.dashboard,
      'नियोक्ता डैशबोर्ड': commands.employer,
      'सहायता': commands.help
    };

    // Process command...
  }, []);

  // UI with floating mic button
}
