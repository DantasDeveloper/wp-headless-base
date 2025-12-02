import Image from "next/image";

import { Author } from "@/lib/wordpress.d";

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  const avatarUrl = author.avatar_urls ? author.avatar_urls['96'] || author.avatar_urls['48'] || Object.values(author.avatar_urls)[0] : null;
  
  return (
    <div className="w-full max-w-[745px] h-auto min-h-[417px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-6 md:p-8" style={{ border: '2px solid #031a2b' }}>
      <div className="flex flex-col items-center text-center h-full">
        <div className="mb-6">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-900"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-4xl border-4 border-blue-900">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {author.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-[600px]">
          {author.description || 
            `This standard Lorem Ipsum passage been Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet dignissim nec, tristique vel urna. Vivamus dictum ultricies nibh, vitae pulvinar magna rhoncus et. Duis cursus, purus at ultricies viverra, velit nisl tincidunt nisi, vel cursus nisi lorem in justo.`
          }
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">15 Artigos</strong> • <strong className="text-gray-900 dark:text-white">0 Comentários</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
