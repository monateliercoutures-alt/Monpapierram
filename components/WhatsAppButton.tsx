import { MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Bouton flottant WhatsApp, toujours accessible en bas à droite
export default function WhatsAppButton() {
  return (
    <a
      href={lienWhatsApp(MESSAGE_GENERAL)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b7a4b] text-white shadow-md transition-transform hover:scale-105 motion-reduce:transition-none"
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  );
}
