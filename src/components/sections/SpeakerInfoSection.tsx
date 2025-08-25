import React from 'react';
import Image from 'next/image';
import MarkdownContent from '@/components/elements/MarkdownContent';
import { Lang } from '@/types/lang';

interface Speaker {
  name: string;
  avatar_url?: string;
  biography?: string;
}

interface SpeakerInfoCardProps {
  speaker: Speaker;
  lang: Lang;
  className?: string;
}

const SpeakerInfoSection: React.FC<SpeakerInfoCardProps> = ({ speaker, lang, className = '' }) => {
  const isJapanese = lang === 'ja';

  return (
    <div className={`bg-white rounded-lg border border-gray-300 px-6 py-6 md:px-12 md:py-8 ${className}`}>
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* アバター */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {speaker.avatar_url ? (
            <Image
              src={speaker.avatar_url}
              alt={speaker.name}
              width={120}
              height={120}
              className="object-cover w-[120px] h-[120px] rounded-lg"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-lg">
              <span className="text-white text-4xl font-bold">
                {speaker.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* スピーカー情報 */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {isJapanese ? 'プロフィール' : 'Profile'}
          </p>
          {speaker.biography && (
            <MarkdownContent 
              content={speaker.biography}
              className="text-gray-700 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerInfoSection;