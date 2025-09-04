import React from 'react';
import Image from 'next/image';

interface SpeakerAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  className?: string;
}

const sizeMap = {
  small: { container: 'w-[98px] h-[98px]', image: 96, text: 'text-3xl' },
  medium: { container: 'w-[120px] h-[120px]', image: 120, text: 'text-4xl' },
  large: { container: 'w-[150px] h-[150px]', image: 150, text: 'text-5xl' },
};

const SpeakerAvatar: React.FC<SpeakerAvatarProps> = ({
  name,
  avatarUrl,
  size = 'small',
  showName = false,
  className = '',
}) => {
  const sizeConfig = sizeMap[size];

  return (
    <div className={`text-center ${className}`}>
      <div className={`bg-white p-1 shadow-lg ${sizeConfig.container} flex items-center justify-center`}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={sizeConfig.image}
            height={sizeConfig.image}
            className={`object-cover w-full h-full`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {showName && (
        <p className="mt-2 text-sm font-bold text-gray-700">{name}</p>
      )}
    </div>
  );
};

export default SpeakerAvatar;