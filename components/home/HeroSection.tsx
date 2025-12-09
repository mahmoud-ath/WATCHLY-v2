import React from 'react';
import HeroSectionDesktop from './HeroSectionDesktop';
import HeroSectionMobile from './HeroSectionMobile';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Mobile Hero (< md) */}
      <div className="block md:hidden">
        <HeroSectionMobile />
      </div>

      {/* Desktop Hero (md+) */}
      <div className="hidden md:block">
        <HeroSectionDesktop />
      </div>
    </>
  );
};

export default HeroSection;