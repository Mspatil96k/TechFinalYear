import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingWhatsApp() {
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      data-testid="button-floating-whatsapp"
    >
      <MessageCircle className="w-7 h-7" />
      {showPulse && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      )}
    </a>
  );
}
