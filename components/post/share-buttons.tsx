"use client";

import { Facebook, Twitter, MessageCircle, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full max-w-[355px] h-auto min-h-[40px]">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        Compartilhe:
      </span>
      <div className="flex gap-2 flex-wrap">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px] rounded flex items-center justify-center text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#031a2b' }}
          aria-label="Compartilhar no Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px] rounded flex items-center justify-center text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#031a2b' }}
          aria-label="Compartilhar no Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px] rounded flex items-center justify-center text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#031a2b' }}
          aria-label="Compartilhar no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="w-[40px] h-[40px] rounded flex items-center justify-center text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#031a2b' }}
          aria-label="Copiar link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      {copied && (
        <span className="text-xs text-green-600 dark:text-green-400 whitespace-nowrap">
          Copiado!
        </span>
      )}
    </div>
  );
}
